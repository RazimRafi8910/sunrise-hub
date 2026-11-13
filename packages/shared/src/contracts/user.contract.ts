import type { CourseEnum, DepartmentsEnum } from "../types/constants.js";
import type { UserRolesEnum } from "../types/roles.js";


export interface User {
  id: string;
  fullname: string;
  name?: string;
  email: string;
  emailVerified: string;
  createdAt: string;
  collegeId: string;
  isActive: boolean;
  role: UserRolesEnum;
  department: DepartmentsEnum;
  classYear: string;
  course: CourseEnum;
}


export interface SessionInfo {
  id: string,
  userId: string,
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface Session {
  session: Session,
  user:User
}
