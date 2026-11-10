const USER_ROLE = ['student', 'faculty', 'staff', 'admin'] as const;
export type UserRole = (typeof USER_ROLE)[number];

export const UserRoles = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  STAFF: 'staff',
  ADMIN: 'admin'
} as const

export type UserRolesType = typeof UserRoles
export type UserRolesEnum = typeof UserRoles[keyof typeof UserRoles]
