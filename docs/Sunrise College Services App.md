# Sunrise College Services App

Oct 17, 2026 · @Razim rafi

## Overview

This app puts everyday campus services in one place for everyone at Sunrise College, from students to faculty and staff. It makes facilities easier to use. It is not a student management app, so it does not handle academic records or attendance.

The first services are the canteen, the store and discipline reporting, with events planned for later. It starts as a web app that users can add to their home screen (a PWA), and a native mobile app follows once the web version works.

## Users and roles

Every person at the college uses the same app, and what they see and can do depends on their role. A teacher has more permissions than a student, and the home screen is built from the permissions the backend returns for that user.

| Role | Typical permissions | Where they work |
| --- | --- | --- |
| Student | Order from canteen and store, pay by wallet or cash, submit discipline reports | User app |
| Faculty | Everything a student can do, plus review discipline reports | User app |
| Canteen / store staff | Manage menu and stock, process the order queue, mark cash orders as paid | Staff dashboard |
| Admin / discipline committee | Manage users and roles, act on reports, see reporter identity, configure services | Admin dashboard |

The role names and permission split above are a starting point and can change.

- Store roles and permissions in the database, not in code.
- Check permissions, not role names, in Express middleware, for example `can('report:review')`.
- Build one app, not one per role.

## Services

Three services launch first, and events join later.

| Service | What users can do | Phase |
| --- | --- | --- |
| Canteen | Browse the menu, order food, pay with wallet or cash, track the order | Now |
| Store | Buy stationery items, pay with wallet or cash | Now |
| Discipline reporting | Report a rule violation, such as a uniform violation, with a photo | Now |
| Events | See upcoming events and their details | Future |

Canteen and store follow the same flow: browse items, order, pay, then fulfil. Build this once as a generic ordering module with two vendors instead of two separate systems. Keep each service as its own module so adding events later does not touch the others.

## Home screen design

The home screen should lead with what a user can do (wallet, orders, services), not with who they are. The first rough wireframe had a header, a student card, a services grid and a bottom bar. Because faculty and staff use the app too, the revised layout reads top to bottom like this:

1. Header: logo and a notification bell.
2. Compact identity and wallet: name, role badge, ID number and the wallet balance.
3. Active orders strip, for example "Order #42 is being prepared".
4. Services grid, rendered from the user's permissions.
5. Notices or upcoming events, once events exist.
6. Bottom navigation: Home, Wallet, Settings, Profile.

**Changes from the first sketch**

- Give each service a distinct name. The sketch repeated "canteen" as placeholder text.
- Keep only essentials on the home card. Full details and editing belong in the Profile tab.
- Consider a QR or barcode on the identity card for canteen billing. Tapping it opens a full-screen view.
- Fill the empty space below the services with notices, active orders or recent transactions.
- Use icons with labels, touch targets of at least 44 px, a clear active-tab state, and three to four services per row with a "More" tile if the list grows.
- Return the services list from the backend, so services can be switched on or off per role or per college without redeploying the frontend.

## Discipline reporting

Discipline reporting is the feature most likely to cause real problems if built naively, so it needs rules around privacy, review and abuse, and the college administration should agree on the policy before any code is written. Users report a rule violation with a photo, for example a uniform violation, and reviewers decide what happens next.

**Student-facing name.** "Discipline" feels like punishment. Options considered:

- **Report an Issue**: friendly, and later covers non-discipline issues such as broken benches. Suggested pick.
- **Campus Report**: neutral and short.
- **Campus Rules**: describes the topic.
- **Conduct**: formal but clear.

Internally the module can still be called `discipline`.

**Workflow.** A report moves through these states: submitted, under review, verified or rejected, then action taken. Reports go to a reviewer and never straight to the person reported.

**Safeguards**

- Only authorised roles can review and act. Students can only submit.
- Hide the reporter's identity from the reported person. Admins can still see it for accountability.
- Limit reports per day, track rejected reports per user, and flag repeat false reporters.
- Store images privately with signed URLs, strip EXIF metadata, and delete images after resolution or a set retention period.
- Use a structured form: pick a rule category (uniform, ID card and so on), attach a photo, add an optional note.

## Wallet and payments

The wallet is a ledger, and online top-up through a payment gateway is the default way to add money; cash top-up at the counter comes later. Orders can be paid from the wallet or in cash.

**Ledger design**

- Never just update a `balance` field. Record every credit and debit as an immutable entry (top-up, purchase, refund, adjustment) with amount, reference ID and balance after.
- Store money as integers in paise, not floats.
- Cash top-up later is just another source on the same ledger.
- Use database transactions for payments so a balance cannot be spent twice.

**Online top-up flow** (a gateway such as Razorpay with UPI)

1. The client asks the API to create a top-up. The API creates a gateway order and stores a pending transaction.
2. The user pays in the gateway checkout.
3. The gateway sends a webhook to the API. The API verifies the signature, marks the transaction successful and credits the wallet.
4. The client never decides that a payment succeeded.

**Watch out for**

- Duplicate webhooks. Use the gateway's payment ID as a unique key so a wallet is never credited twice.
- Transaction states: pending, then success, failed or refunded.
- Cash orders: create the order as pending payment, and let staff with the right permission mark it paid.
- Regulation: holding user balances can fall under RBI rules for prepaid instruments. Confirm with the college and the gateway, especially if balances can be refunded as cash.

## Architecture and tech stack

One backend and one database serve every client, so the dashboards are just different clients with different permissions.

&#91;embedded content: architecture · 3 clients, 1 API, 4 services\]

The user app, staff dashboard and admin dashboard all call the same Express API. Only the API talks to the database, Redis, image storage and the payment gateway. A monorepo works well: `apps/user-app`, `apps/staff-dashboard`, `apps/api` and `packages/shared` for types and validation schemas.

| Layer | Choice | Why |
| --- | --- | --- |
| Client | React, TypeScript, Vite, vite-plugin-pwa | PWA now, mobile app later |
| API | Node, Express, TypeScript, Zod | Shared types and validation across clients |
| Database | PostgreSQL (MongoDB with transactions also works) | Wallet, orders and payments are relational and need strict transactions |
| Realtime | Socket.io, with the Redis adapter when scaling | Pushes order status to users and dashboards |
| Cache and limits | Redis | Daily limits on reports, socket scaling |
| Images | S3 or Cloudinary, private, pre-signed uploads | Photos skip the Express server |
| Payments | Razorpay | UPI top-up with webhooks |

**Web app first (PWA)**

- A PWA needs a web manifest, a service worker and HTTPS.
- Push notifications work on Android Chrome. On iOS they only work once the PWA is added to the home screen, so use Socket.io for in-app updates and treat push as a bonus.
- The camera works for report photos through a file input with `capture`.
- Offline support is limited to the app shell, since orders and payments need a connection.
- Keep logic in the API and in shared code so a later move to React Native or Capacitor reuses most of it.

## Authentication

The recommended approach is a self-hosted auth library such as Better Auth running inside the Express API, instead of writing auth from scratch or using a hosted service like Clerk. The final choice is still open.

**Hosted vs self-hosted.** A hosted service runs the login system on the provider's servers and stores users, passwords and sessions there. A self-hosted library runs inside your own API and stores them in your own PostgreSQL database. Self-hosted means the library runs in your infrastructure; it does not mean you write the security code yourself.

| Option | Where user data lives | Cost | Fit for this app |
| --- | --- | --- | --- |
| Custom auth | Your database | Your time | Highest risk for an app that holds wallet balances |
| Self-hosted library (Better Auth) | Your database | Hosting only | Best fit: college-provisioned users, data under your control |
| Hosted service (Clerk) | Provider's servers | Per active user | Fastest to ship, but lock-in and per-user cost |

**Why self-hosted fits**

- Users are provisioned by the college. Admins import students and staff from a list, so open-signup tooling gets in the way.
- Identity and wallet data stay in your own database, which is easier to explain to the college administration.
- There is no per-user bill as the number of daily users grows.
- The app needs cookie sessions for the web clients now and tokens for a mobile app later. Check the library's current docs for mobile support.
- Leaving later is easy, because the data is already yours.

**What stays in your own code**

- Authorization: keep roles and permissions in your own tables and check them with `can('report:review')`, so switching auth libraries never changes the permission model.
- A payment PIN or re-authentication before wallet spending, so a stolen session cannot drain a balance.
- Rate limiting on login and OTP endpoints, using Redis.
- Session revocation, so an admin can log someone out.
- Audit logs for role changes and report reviews.
- Sending reset and OTP messages through your own provider, such as SES or Resend.

**Learning step.** Build a small custom auth (register, login, hashed passwords, Redis sessions, refresh token rotation, logout) in a separate practice repo first. It shows what a library does for you, and the real project then uses the library.

Before committing, check Better Auth's current docs for Express integration, the PostgreSQL adapter and plugin support.

## Folder structure

The project is one monorepo with an API, three frontends and a shared package, and each backend service is its own module. The names below are a starting point and can change.

```text
sunrise-app/
├── apps/
│   ├── api/                       # Express + TypeScript backend
│   │   ├── src/
│   │   │   ├── app.ts             # Express app, global middleware
│   │   │   ├── server.ts          # HTTP and Socket.io bootstrap
│   │   │   ├── config/            # env validation, constants
│   │   │   ├── db/                # connection, migrations, seeds
│   │   │   ├── middleware/        # auth, can() check, rate limit, errors
│   │   │   ├── modules/
│   │   │   │   ├── auth/          # login, sessions, OTP
│   │   │   │   ├── users/         # users, roles, permissions, bulk import
│   │   │   │   ├── wallet/        # ledger, top-up, gateway webhooks
│   │   │   │   ├── ordering/      # generic orders for canteen and store
│   │   │   │   ├── canteen/       # menu and canteen-specific rules
│   │   │   │   ├── store/         # items and store-specific rules
│   │   │   │   ├── discipline/    # reports, review workflow, images
│   │   │   │   └── events/        # added later
│   │   │   ├── realtime/          # Socket.io handlers
│   │   │   ├── lib/               # redis, storage, payment gateway clients
│   │   │   └── utils/
│   │   └── package.json
│   ├── user-app/                  # PWA for students and faculty
│   │   ├── public/                # web manifest, icons
│   │   └── src/
│   │       ├── app/               # router, providers
│   │       ├── features/          # home, canteen, store, wallet, reports, profile
│   │       ├── components/        # shared UI pieces
│   │       ├── hooks/
│   │       └── lib/               # API client, socket client
│   ├── staff-dashboard/           # canteen and store staff
│   │   └── src/features/          # order-queue, menu, cash-payments
│   └── admin-dashboard/           # users, roles, report review
│       └── src/features/
├── packages/
│   └── shared/                    # types, Zod schemas, permission constants
├── package.json                   # workspaces config
└── README.md
```

**Inside each API module**

- `*.routes.ts`: URL paths and which permission each one needs.
- `*.controller.ts`: reads the request and sends the response, nothing more.
- `*.service.ts`: the business rules.
- `*.repository.ts`: all database queries for that module.
- `*.schema.ts`: Zod validation shared with the frontends where possible.
- `*.test.ts`: tests that sit next to the code they cover.

**Rules that keep it clean**

- Apps never import from each other. They share code only through `packages/shared`.
- Controllers stay thin. Wallet and payment logic lives in services, never in route handlers.
- Only the wallet module writes ledger entries. Ordering calls the wallet service to charge a user.
- Adding events later means adding one folder under `modules/` without touching the others.

## Build order and next steps

Build the foundations first, because every later service depends on roles and the wallet.

1. Authentication and roles with permissions (RBAC).
2. Wallet ledger and online top-up through the payment gateway.
3. Canteen: menu, cart, orders, status flow and the staff dashboard.
4. Store, reusing the same ordering module.
5. Discipline reporting with the review workflow.
6. Events.

The next piece of design work is the database schema: users, roles, permissions, wallet ledger and orders. After that, a wallet and payment flow diagram.

## App name ideas and open questions

The suggested name is **Sunrise One**, because it says one app for every campus service and stays accurate as features are added. A short brand-style alternative is **Dawn**.

**Other names considered**

- Sunrise Hub
- Sunrise Connect
- Sunrise Go
- Uday, the Hindi and Sanskrit word for sunrise
- Rise

**Before choosing a name**

- Search the Play Store and App Store for clashes.
- Check the domain and social handles.
- Say it in a sentence: students will say "order it on \_\_\_" every day.
- Make sure it fits as a home-screen icon label of about 12 characters or fewer.

**Open questions**

- Which app name to use.
- Whether the college administration approves the discipline reporting policy.
- Who reviews reports: faculty, a discipline committee, or both.
- Whether to use PostgreSQL or MongoDB for the database.
- Whether the wallet's refund rules need review under prepaid-instrument regulation.
