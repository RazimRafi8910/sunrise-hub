# Sunrise Hub: Reporting Feature Plan

Nov 19, 2026 · @Razim rafi

## Overview

The reporting feature lets anyone in the college report a rule violation with photo evidence, lets reviewers verify it, and notifies the person who broke the rule. It is one of Sunrise Hub's services, next to canteen, store and (later) events. A single report can cite more than one violated rule.

**Terms used in this plan**

- **Reporter:** the user who reports a violation (a student, for example).
- **Actor:** the user who committed the violation.
- **Reviewer:** any user above student level for now; a designated reviewer or discipline coordinator role may come later, so the design must allow it.

**Stack:** Node.js, TypeScript, Express, React; Postgres on Neon; Neon Object Storage for images; web app (PWA-style) first, mobile app later.

**v1 scope:** submit report with images, reviewer queue, status updates, in-app and email notification to the actor, report history, and a basic tracker. Queues, rewards and server-side image processing are deferred (see the last section).

## Decisions log

These are the decisions taken so far; anything not listed is still open (see the last section).

| # | Area | Decision |
| --- | --- | --- |
| 1 | Reporter flow | Reporter fills a report page with images and the actor's account if the actor is identified; the actor is optional and a reviewer can fill it in |
| 2 | Storage | Images go to a private bucket via presigned upload URLs; the database stores only the storage key, never a public URL |
| 3 | Storage provider | Neon Object Storage (S3-compatible, 5 GB free per project); Neon's 1 GB free limit is Postgres storage only |
| 4 | Reviewers | Any user above student can verify reports for now; a designated reviewer role may come later, so authorization lives in one policy function |
| 5 | Reporter anonymity | Reviewers can see the reporter; the actor cannot |
| 6 | Meaning of verified | A reviewer confirmed that the violation happened |
| 7 | Actor notification | Actor is notified in-app (shown on login), by email, and by push where possible; email sent with evidence if possible (see Notifications for the privacy recommendation) |
| 8 | Appeals (v1) | The report card shows a note: appeal to the reviewer or the discipline coordinator; the actor can see who the reviewer is |
| 9 | Camera | Gallery uploads are allowed; the camera option is only for convenience |
| 10 | Status `closed` | New final status: a reviewer sets it after the actor has completed the punishment (for example paid the fine); it follows `action_taken` |
| 11 | Tracker | Track frequent violators and the number of reports per user |
| 12 | Queues | Removed from v1; email is sent after commit without blocking, image processing moves to the browser, retention cleanup runs on a schedule |
| 13 | Module layout | Everything stays in the `reports` module, plus a thin shared `storage` service that knows nothing about reports |
| 14 | Rewards (future) | Reporters may earn a bonus or wallet balance when a report is verified; deferred to a later iteration |
| 15 | Retention | Evidence images are deleted after a retention period via `delete_after` |
| 16 | Multiple rules per report | One report can cite several violated rules; modelled with an explicit `report_rules` join table instead of a `rule_id` column on `reports`; at least one rule is required, enforced in the service layer |

## End-to-end flow

A report moves from the reporter's phone to a reviewer's queue and back to the actor as a notification, in nine steps.

1. **Fill the report page.** The reporter picks one or more rules, takes or chooses up to 3 photos, adds the actor's account if known (otherwise a hint and a note), and may set when and where it happened.
2. **Prepare images in the browser.** The client re-encodes each photo through a canvas (compresses it and strips EXIF) and makes a thumbnail. It reads the EXIF capture time first and sends it as `captured_at`.
3. **Request upload URLs.** `POST /reports/uploads` with file type and size. The server validates both, builds keys like `reports/{userId}/{uuid}.jpg`, and returns short-lived presigned PUT URLs.
4. **Upload directly to the bucket.** The browser PUTs each image to Neon Object Storage; the server never handles the bytes.
5. **Create the report.** `POST /reports` with the rule ids (at least one), subject, note and image keys. The server checks that every rule exists and is active, that every key starts with this user's prefix and that the object exists, then inserts the report, its `report_rules` rows, the image rows and a first `report_events` row in one transaction.
6. **Review.** A reviewer opens the queue (ordered by status and date), views evidence through short-lived signed download URLs, resolves the actor if the reporter did not, and moves the report to `under_review`, then `verified` or `rejected`.
7. **Notify the actor.** On `verified`, the status event and a `notifications` row are written in one transaction; after commit the app sends an email without blocking the response. The actor also sees the notice in-app on login.
8. **Action.** The reviewer records the punishment and moves the report to `action_taken`; `resolution_note` holds the details (for example the fine).
9. **Close.** When the actor has completed the punishment, the reviewer moves the report to `closed`. A rejected or closed report is final and gets a `delete_after` date for its images.

The reporter is also notified when their report is verified or rejected.

## Database design

Six tables carry the feature: the original `rules`, `reports` and `report_images`, plus `report_rules` (which links reports to the rules they violate), `report_events` and `notifications`. The existing `"user"` table is referenced by `text` ids.

**`rules`**

| Column | Type | Notes |
| --- | --- | --- |
| id | smallint, identity, PK |  |
| name | text, not null, unique | for example Uniform, ID card |
| is\_active | boolean, not null, default true | soft switch, rules are never deleted |

**`reports`**

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid, PK | `gen_random_uuid()` |
| reporter\_id | text, not null, FK user | visible to reviewers only |
| subject\_user\_id | text, FK user | the actor; null until known, reviewer can fill it |
| subject\_hint | text | what the reporter knows about the actor |
| note | text |  |
| observed\_at | timestamptz | when the reporter saw it (their claim) |
| location | text | optional |
| status | text, not null, default `submitted` | check: submitted, under\_review, verified, rejected, action\_taken, closed |
| reviewed\_by | text, FK user | latest reviewer; full history lives in `report_events` |
| reviewed\_at | timestamptz |  |
| resolution\_note | text | punishment details, for example the fine |
| delete\_after | timestamptz | image retention date, set when the report reaches `rejected` or `closed` |
| created\_at | timestamptz, not null, default now() |  |

There is no `rule_id` column on `reports`; the violated rules live in `report_rules`.

Constraints and indexes on `reports`:

- `verified_needs_subject`: status in (verified, action\_taken, closed) requires `subject_user_id` not null.
- `reviewed_needs_reviewer`: status other than `submitted` requires `reviewed_by` not null.
- `reporter_id <> subject_user_id`: nobody reports themselves.
- Index `(status, created_at)` for the reviewer queue.
- Index `(reporter_id, created_at desc)` for my reports.
- Partial index `(subject_user_id) where subject_user_id is not null` for repeat-violator lookups.

**`report_rules`** (join table: which rules a report violated)

| Column | Type | Notes |
| --- | --- | --- |
| report\_id | uuid, not null, FK reports, on delete cascade | removing a report removes its links |
| rule\_id | smallint, not null, FK rules, on delete restrict | a rule that has been used cannot be deleted; retire it with `is_active = false` |

- Primary key `(report_id, rule_id)`: the same rule cannot be attached to the same report twice.
- Index `(rule_id)`: the primary key only serves lookups that start with `report_id`, so this index serves "all reports that violated rule X" and the tracker.
- A report must have at least one rule. Postgres cannot express "at least one child row" with a plain constraint, so the service layer validates `ruleIds.length >= 1` and the insert happens in the same transaction as the report.
- The join table is explicit (not Prisma's implicit many-to-many) so columns such as a per-violation note or severity can be added later without a painful migration.

**`report_images`**

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid, PK |  |
| report\_id | uuid, not null, FK reports, on delete cascade |  |
| storage\_key | text, not null | private bucket key, never a public URL |
| content\_type | text |  |
| size\_bytes | integer |  |
| captured\_at | timestamptz | EXIF capture time read in the browser; a hint, not proof |
| created\_at | timestamptz, not null, default now() |  |
| deleted\_at | timestamptz | set after the object is removed from the bucket |

Deleting a row does not delete the file, so the retention job removes the bucket object first and then sets `deleted_at`.

**`report_events`** (append-only audit trail)

| Column | Type | Notes |
| --- | --- | --- |
| id | bigint, identity, PK |  |
| report\_id | uuid, not null, FK reports, on delete cascade |  |
| actor\_id | text, not null, FK user | who made the change |
| from\_status | text | null for the first event |
| to\_status | text, not null |  |
| note | text |  |
| created\_at | timestamptz, not null, default now() |  |

Every status change writes one row in the same transaction as the update to `reports.status`. This is why `reports` needs no `closed_at` column.

**`notifications`**

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid, PK |  |
| user\_id | text, not null, FK user | recipient |
| type | text, not null | for example report\_verified, report\_action\_taken |
| report\_id | uuid, FK reports, on delete cascade |  |
| read\_at | timestamptz | null means unread |
| emailed\_at | timestamptz | null means not emailed yet; lets a later worker pick up misses |
| created\_at | timestamptz, not null, default now() |  |

Partial index `(user_id, created_at desc) where read_at is null` serves the unread list.

**Migration for the new status** (the original check constraint was unnamed; its default name is probably `reports_status_check`):

```sql
alter table reports drop constraint reports_status_check;
alter table reports add constraint reports_status_check
  check (status in ('submitted','under_review','verified','rejected','action_taken','closed'));

alter table reports drop constraint verified_needs_subject;
alter table reports add constraint verified_needs_subject
  check (status not in ('verified','action_taken','closed') or subject_user_id is not null);
```

**Migration for multiple rules per report.** If `reports` already has rows with a `rule_id`, create the join table and copy the links before dropping the column. With Prisma, use `prisma migrate dev --create-only` and edit the generated SQL so the copy runs before the `DROP COLUMN`:

```sql
create table report_rules (
  report_id uuid not null references reports(id) on delete cascade,
  rule_id   smallint not null references rules(id) on delete restrict,
  primary key (report_id, rule_id)
);
create index report_rules_rule_id_idx on report_rules(rule_id);

insert into report_rules (report_id, rule_id)
select id, rule_id from reports where rule_id is not null;

drop index if exists reports_rule_id_idx;  -- name may differ; check with \d reports
alter table reports drop column rule_id;
```

## Storage and image upload

Images live in a private Neon Object Storage bucket and are reached only through short-lived presigned URLs. Neon's 1 GB free limit is Postgres storage; Object Storage is a separate 5 GB per project on the free plan.

**Provider notes** (checked against Neon's docs on 2026-11-18; Object Storage is in beta)

- S3-compatible: use `@aws-sdk/client-s3` and the presigner with `forcePathStyle: true`.
- Presigned upload and download URLs are supported.
- A bucket's access level (private or public\_read) is set in the Neon Console or API, not through bucket ACL calls. Keep it private.
- Egress from Object Storage counts toward the 5 GB per project monthly network transfer on the free plan, so compress images and use thumbnails in list views.
- Available regions include Asia Pacific (Singapore); use it.
- Rough capacity: about 12,000 images at 400 KB each in 5 GB. This is an estimate to verify with real data.
- Not yet checked: the maximum size of a presigned upload; read the limits page before setting the app's own cap.

**Upload rules (reports module policy)**

| Rule | Value |
| --- | --- |
| Images per report | up to 3 |
| Allowed types | JPEG, PNG, WebP |
| Size cap | set after checking Neon's presign limit; target a few hundred KB after client compression |
| Key format | `reports/{userId}/{uuid}.{ext}` |
| Ownership check | on report creation, every key must start with the caller's prefix and exist in the bucket (HEAD request) |
| Orphans | a bucket lifecycle rule or the cleanup job removes uploads never attached to a report after 24 hours |
| Viewing | signed download URLs with short expiry, issued only after a permission check |

**Client-side processing**

The browser re-encodes each photo through a canvas (compression and EXIF removal), makes a thumbnail, and reads the EXIF capture time before stripping it. This is not tamper-proof, but the risk mostly concerns the reporter's own privacy. Server-side processing returns with queues in a later iteration.

**Camera**

Use `<input type="file" accept="image/*" capture="environment">`. On phones it opens the native camera with no permission code. Gallery uploads stay allowed. A live in-page camera (`getUserMedia`) is possible later but is not needed.

**Retention**

`delete_after` is set when a report becomes `rejected` or `closed`. A scheduled job (`node-cron` in the Express process, daily) finds expired images, deletes the bucket objects first, then sets `report_images.deleted_at`. If the app ever runs more than one instance, run this job in one place only.

## Notifications and email

The in-app notification is the source of truth; email, Socket.io and web push are extra delivery channels on top of it.

**Who is notified, and when**

| Status change | Actor | Reporter | Channels |
| --- | --- | --- | --- |
| `verified` | yes | yes | in-app, email, push where possible |
| `rejected` | no | yes | in-app, email |
| `action_taken` | yes (shorter notice) | no | in-app, email |
| `closed` | optional, decide later | no | in-app |

The actor's notification never contains the reporter's identity. When a report cites several rules, the notice lists all of them.

**How delivery works without queues (v1)**

1. In one transaction: update the status, insert the `report_events` row, insert the `notifications` row.
2. After commit, send the email without awaiting it, and log any failure; a failed email never fails the request.
3. On success set `notifications.emailed_at`. Rows with a null `emailed_at` are what a worker will pick up when queues arrive.
4. A server restart in the middle of a send loses that email; the in-app notice still exists.

**Channels**

- **On login:** show unread notifications. Always works.
- **While online:** push through Socket.io.
- **App closed:** Web Push through the PWA. Works on Android Chrome; on iOS only after the PWA is added to the home screen (iOS 16.4 and later).

**Evidence in email**

The plan was to send evidence with the email if possible. The recommendation is to send a plain notice with a link to the in-app report page, where evidence loads through short-lived signed URLs after login, because emails can be forwarded and kept, and photos may show other students. If images are attached anyway, use signed URLs with a short expiry and accept that they cannot be revoked once forwarded. Decide before building.

**Email provider**

Not chosen yet. Set up SPF and DKIM for the sending domain so college mailboxes do not mark the emails as spam.

## Authorization and privacy

Reviewers can see who reported; the actor cannot, and that rule is enforced where data is queried, not only in the interface.

**Two response shapes**

| Field | Reporter's own view | Reviewer view | Actor view |
| --- | --- | --- | --- |
| Rules, note, images | yes | yes | rules and evidence only after verification |
| Reporter identity | self | yes | never |
| Actor (subject) | as entered | yes | self |
| Reviewer name | after review | yes | yes, so the actor knows whom to appeal to |
| Status and resolution note | status only | yes | status and resolution note |
| Event history | no | yes | no |

The actor view comes from its own serializer that has no reporter field at all, so a coding mistake cannot leak it. Details of what the reporter and actor may see before verification are a proposal and need confirming.

**Who can do what**

- Any logged-in user can submit a report and see their own reports.
- Reviewers (any user above student for now) can see the queue, view evidence, resolve the actor, and change status.
- All permission checks go through one function, `canReview(user, report)`, so introducing a designated reviewer role later changes one place.
- A reviewer cannot review a report where they are the reporter or the actor.
- Later options for designated reviewers: a nullable `assigned_to` on `reports`, or a `rule_reviewers(rule_id, user_id)` table. With several rules per report, decide then whether a report needs a reviewer for any one of its rules or for all of them.

**Appeals (v1)**

The report card shows a note telling the actor to appeal to the reviewer or the discipline coordinator. The appeal itself happens outside the app. If appeals grow, add an `appealed` status and a `report_appeals` table.

**Abuse limits**

- Rate-limit submissions per reporter.
- Use the reporter's accepted and rejected counts (see the tracker) to spot false reporting.
- Strip EXIF before upload so photos do not carry location or device data.

## Tracker and analytics

Both tracking needs (frequent violators and reports per user) are plain SQL over `reports` and `report_rules` for now; a materialized view refreshed by a scheduled job comes later if they get slow.

Define the set of confirmed statuses once in code: `verified`, `action_taken`, `closed`. A closed report is still a confirmed violation, so every violation count must include it.

A report that cites several rules counts once for each rule in the per-rule query below, and once as a report in the per-reporter query. Because `(report_id, rule_id)` is unique, the join never double-counts a rule within one report.

```sql
-- frequent violators, last 90 days (3 or more confirmed violations of one rule)
select r.subject_user_id, rr.rule_id, count(*)
from reports r
join report_rules rr on rr.report_id = r.id
where r.status in ('verified','action_taken','closed')
  and r.created_at > now() - interval '90 days'
  and r.subject_user_id is not null
group by 1, 2
having count(*) >= 3
order by count(*) desc;

-- reports per reporter, with accuracy (counts reports, so it does not touch report_rules)
select reporter_id,
       count(*) as total,
       count(*) filter (where status in ('verified','action_taken','closed')) as accepted,
       count(*) filter (where status = 'rejected') as rejected
from reports
group by 1;
```

The 90-day window and the threshold of 3 are placeholders to adjust.
