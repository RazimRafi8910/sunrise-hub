import { Course, Departments, type CourseEnum, type DepartmentsEnum } from "@sunrise-hub/shared";

export const userDepartmentByCourse = (course: CourseEnum):DepartmentsEnum =>{
  return course == Course.BCA ? Departments.COMPUTER_SCIENCE : Departments.BUSINESS_MANAGEMENT;
}
