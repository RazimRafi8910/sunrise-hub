import type { UserRole, Course } from '../types/roles.js'


//test User
export interface User {
  id: string
  fullname: string
  email: string
  password_hash?: string
  emailVerified: string
  createdAt: Date
  collegeId: string
  isActive: boolean
  role: UserRole
  department: ["CA", "BM"]
  classYear: string,
  course: Course,
}
