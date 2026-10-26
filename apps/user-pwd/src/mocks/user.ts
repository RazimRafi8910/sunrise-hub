export type AppRole = 'student' | 'faculty' | 'staff'

export type MockUser = {
  firstName: string
  lastName: string
  fullName: string
  initials: string
  email: string
  phone: string
  campusId: string
  role: AppRole
  walletBalance: number
}

export const mockUser: MockUser = {
  firstName: 'Ayaan',
  lastName: 'Rahman',
  fullName: 'Ayaan Rahman',
  initials: 'AR',
  email: 'ayaan@example.com',
  phone: '+91 98765 43210',
  campusId: '2201-0457',
  role: 'student',
  walletBalance: 1240,
}

export type RoleCopy = {
  label: string
  idLine: string
  reportName: string
  reportSub: string
  idLabel: string
  department: string
  stageLabel: string
  stageValue: string
  access: string
}

const ROLE_COPY: Record<AppRole, RoleCopy> = {
  student: {
    label: 'Student',
    idLine: 'Computer Science · Year 2',
    reportName: 'Report',
    reportSub: 'Rule violations',
    idLabel: 'Student ID',
    department: 'Computer Science',
    stageLabel: 'Year',
    stageValue: '2nd year',
    access: 'Order, pay and report',
  },
  faculty: {
    label: 'Faculty',
    idLine: 'Computer Science · Faculty',
    reportName: 'Reports',
    reportSub: 'Review and report',
    idLabel: 'Employee ID',
    department: 'Computer Science',
    stageLabel: 'Designation',
    stageValue: 'Assistant Professor',
    access: 'Order, pay, report and review',
  },
  staff: {
    label: 'Staff',
    idLine: 'Administration · Staff',
    reportName: 'Reports',
    reportSub: 'Review and report',
    idLabel: 'Employee ID',
    department: 'Administration',
    stageLabel: 'Designation',
    stageValue: 'Office Assistant',
    access: 'Order, pay, report and review',
  },
}

export function getRoleCopy(role: AppRole): RoleCopy {
  return ROLE_COPY[role]
}
