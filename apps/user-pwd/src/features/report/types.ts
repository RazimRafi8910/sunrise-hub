export type ReportStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'action_taken'
  | 'closed'

export type Role =
  | 'Student'
  | 'Faculty'
  | 'Staff'
  | 'Reviewer'
  | 'Coordinator'

export interface User {
  id: string
  firstName: string
  fullName: string
  initials: string
  course: string
  year: string
  role: Role
}

export interface Report {
  id: string
  ruleTitle: string
  dateLabel: string
  location: string
  status: ReportStatus
}

export interface ReportStats {
  submitted: number
  inReview: number
  verified: number
}

export interface AgainstMeReport {
  id: string
  ruleTitle: string
  status: ReportStatus
}
