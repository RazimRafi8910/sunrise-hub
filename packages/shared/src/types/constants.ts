


export const Course = {
  BBA: "BBA",
  BCA: "BCA",
  BCOM:"BCOM"
} as const

export const Departments = {
  COMPUTER_SCIENCE: "computer_science",
  BUSINESS_MANAGEMENT: "business_management",
}

export type CourseType = typeof Course
export type DepartmentsType = typeof Departments
export type DepartmentsEnum = typeof Departments[keyof typeof Departments]
export type CourseEnum = typeof Course[keyof typeof Course]
