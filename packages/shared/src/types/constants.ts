
export const Course = {
  BBA: "BBA",
  BCA: "BCA",
  BCOM: "BCOM",
  OTHER:"OTHER",
} as const

export const Departments = {
  COMPUTER_SCIENCE: "computer_science",
  BUSINESS_MANAGEMENT: "business_management",
  STAFF:"staff",
}

export const ClassLYears = {
  "24-27": "2024-2027",
  "25-28": "2025-2028",
  "26-29": "2026-2029",
  "other": "other",
}

export type CourseType = typeof Course
export type DepartmentsType = typeof Departments
export type DepartmentsEnum = typeof Departments[keyof typeof Departments]
export type CourseEnum = typeof Course[keyof typeof Course]
