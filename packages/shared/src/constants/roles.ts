export const USER_ROLE = ['student', 'faculty', 'staff', 'admin'] as const;
export type UserRole = (typeof USER_ROLE)[number];
