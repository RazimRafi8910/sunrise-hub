# Sunrise Hub — Admin & Permission Database Design

## 1. Overview

This document describes the database design for the admin management and permission system in Sunrise Hub.

The system supports three types of admin roles:

- **Super Admin:** Has unrestricted access to all modules.
- **Moderator:** Can manage assigned modules based on permissions.
- **Staff:** Can access assigned modules with specific permissions.

The application contains multiple modules, such as:

- Canteen — Food ordering and management.
- Event — Event information and management.
- Store — Store-related operations.
- Report — Reports and analytics.

The main objective is to provide a flexible authorization system where an admin can have access to multiple modules with different permission levels.

---

## 2. Database Architecture

The design uses two separate tables:

1. `admins` — Stores admin account information and role.
2. `permissions` — Stores module-specific permissions assigned to each admin.

### Relationship

One admin can have multiple permissions.

```text
          users
            |
            | 1:1
            |
          admins
            |
            | 1:N
            |
        permissions
```

This relationship allows one admin to manage multiple modules without adding additional columns to the admins table.

---

## 3. Database Schema

### 3.1 Admin Roles

```sql
CREATE TYPE admin_role AS ENUM (
    'super_admin',
    'moderator',
    'staff'
);
```

**Why use an ENUM?**

Admin roles are predefined and have a limited set of possible values. Using an ENUM prevents invalid role values from being inserted.

Role descriptions:

| Role | Description |
|---|---|
| `super_admin` | Full access to the entire application |
| `moderator` | Access to assigned modules |
| `staff` | Access to assigned modules |

### 3.2 Admin Scopes

```sql
CREATE TYPE admin_scope AS ENUM (
    'canteen',
    'event',
    'store',
    'report'
);
```

A scope represents a module or functional area of the application.

**Why separate scope from role?**

A role identifies the type of admin, while a scope identifies the module they are responsible for.

For example, two moderators can have different responsibilities:

- Moderator A → Canteen
- Moderator B → Events

This makes the system flexible when new modules are introduced.

### 3.3 Admin Permissions

```sql
CREATE TYPE admin_permission AS ENUM (
    'manage',
    'viewer'
);
```

Permission levels:

| Permission | Description |
|---|---|
| `manage` | Can access the management dashboard and perform authorized management operations |
| `viewer` | Can access the module's dashboard in read-only mode |

The exact actions included in `manage` should be defined by the backend authorization rules. For example, create, read, and update. Delete can be added if required.

---

## 4. Table Definitions

### 4.1 Admins Table

```sql
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES users(id) ON DELETE CASCADE,

    role admin_role NOT NULL DEFAULT 'moderator',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Column explanations**

| Column | Description |
|---|---|
| `id` | Unique identifier for the admin |
| `user_id` | References the existing user account |
| `role` | Defines the admin's role |
| `created_at` | Records when the admin account was created |

**Why separate admins from users?**

Not every application user needs administrative privileges.

Keeping admins in a separate table provides several benefits:

- Keeps regular user accounts separate from administrative accounts.
- Makes it easier to identify administrative users.
- Allows administrative information to be maintained independently.
- Avoids adding unnecessary admin-related fields to the users table.

**Why use `user_id` instead of storing email and password again?**

The application already has a users table containing authentication information.

Duplicating email and password in the admins table creates unnecessary data duplication and synchronization problems.

The admin account can reuse the existing user's authentication credentials.

The `UNIQUE` constraint ensures that one user cannot have multiple admin records.

### 4.2 Permissions Table

```sql
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    admin_id UUID NOT NULL
        REFERENCES admins(id) ON DELETE CASCADE,

    admin_scope admin_scope NOT NULL,

    permission admin_permission NOT NULL DEFAULT 'viewer',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (admin_id, admin_scope)
);
```

**Column explanations**

| Column | Description |
|---|---|
| `id` | Unique permission record identifier |
| `admin_id` | References the admin who receives the permission |
| `admin_scope` | Identifies the module |
| `permission` | Defines the access level |
| `created_at` | Records when the permission was assigned |

**Why use a separate permissions table?**

An admin may have access to multiple modules.

For example:

- Canteen → Manage
- Events → Viewer
- Store → Manage

If permissions were stored directly in the admins table, we would need multiple columns or a complicated structure to support multiple modules.

A separate table solves this problem using a one-to-many relationship.

**Why use a UNIQUE constraint?**

```sql
UNIQUE (admin_id, admin_scope)
```

This ensures that an admin can have only one permission level per module.

For example, the following records cannot coexist:

| admin_id | admin_scope | permission |
|---|---|---|
| A1 | canteen | manage |
| A1 | canteen | viewer |

Instead, the existing permission should be updated when the access level changes.

---

## 5. Example Data

Consider the following admin accounts.

### Admins

| id | user_id | role |
|---|---|---|
| A1 | U1 | super_admin |
| A2 | U2 | moderator |
| A3 | U3 | staff |

### Permissions

| admin_id | admin_scope | permission |
|---|---|---|
| A2 | canteen | manage |
| A2 | event | viewer |
| A2 | store | manage |
| A3 | canteen | viewer |

### Explanation

**U1 — Super Admin**

Has unrestricted access to all modules. No permission records are required.

**U2 — Moderator**

- Can manage Canteen.
- Can view Events.
- Can manage Store.

**U3 — Staff**

- Can only view Canteen.

This demonstrates how multiple admins can have different permissions across multiple modules.

---

## 6. Authorization Logic

Authorization should be handled by the backend, not just by hiding or displaying frontend components.

The backend should check:

1. Whether the authenticated user has an admin account.
2. Whether the admin has the required role.
3. Whether the admin has access to the requested module.
4. Whether the permission allows the requested action.

### Authorization rules

| Role | Authorization |
|---|---|
| Super Admin | Bypasses module permission checks |
| Moderator | Requires an assigned module and sufficient permission |
| Staff | Requires an assigned module and sufficient permission |

### Example authorization function

```typescript
type Permission = {
    admin_scope: string;
    permission: "manage" | "viewer";
};

function canAccess(
    role: string,
    permissions: Permission[],
    scope: string,
    action: "manage" | "viewer"
): boolean {

    // Super admin has unrestricted access
    if (role === "super_admin") {
        return true;
    }

    return permissions.some(
        (p) =>
            p.admin_scope === scope &&
            (
                p.permission === "manage" ||
                p.permission === action
            )
    );
}
```

This is a simplified example. In production, each action should be checked explicitly, particularly if delete or other sensitive operations are introduced.

---

## 7. Important Design Decisions

### Why not store `all` in admin_scope?

`all` is unnecessary because unrestricted access is already represented by the `super_admin` role.

This avoids having two different ways to grant unrestricted access.

### Why not store `none` in admin_scope?

If an admin has no permissions, they simply have no records in the permissions table.

There is no need to explicitly store the absence of a permission.

### Why use ENUM instead of TEXT?

ENUM values restrict invalid data and provide consistency across the database.

However, if modules and permission types are expected to be added frequently through an admin dashboard, lookup tables may be more appropriate in the future.

### Why separate role and permission?

They represent two different concepts:

- **Role:** Who is the admin?
- **Permission:** What can the admin do, and where can they do it?

Keeping these concepts separate makes the authorization system easier to maintain and extend.

---

## 8. Future Improvements

The current design is sufficient for the initial requirements. However, the following improvements can be considered as the application grows.

### Granular permissions

If the application requires more detailed access control, permissions can be expanded to:

- Create
- Read
- Update
- Delete

This would allow different admins to have more specific access.

### Module lookup table

If modules become dynamic, replace the `admin_scope` ENUM with a `modules` table.

This would allow new modules to be registered without changing the database ENUM definition.

### Permission audit logs

Consider adding an audit log to record:

- Who assigned a permission.
- Who changed a permission.
- Which permission was changed.
- When the change occurred.

This is particularly useful for administrative applications.

---

## 9. Final Design Summary

| Table | Responsibility |
|---|---|
| `users` | Stores application user accounts and authentication information |
| `admins` | Stores administrative account information and roles |
| `permissions` | Stores module-specific access permissions |

The design follows a simple principle:

**One user → One admin account → Multiple module permissions.**

This approach provides:

- Separation between regular users and admins.
- Support for multiple module assignments.
- Different permission levels for different modules.
- Centralized backend authorization.
- A straightforward path toward more granular access control.

The proposed structure is intentionally simple while leaving room for future expansion.
