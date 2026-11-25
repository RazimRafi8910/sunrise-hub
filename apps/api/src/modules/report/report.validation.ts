import z from "zod";


export const ReportStatus = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  AI_REVIEWED:"ai_reviewed",
  VERIFIED: "verified",
  REJECTED: "rejected",
  ACTION_TAKEN:"action_taken",
  CLOSED:"closed",
}

export const createReportValidation = z.object({
  subjectUserId: z.string().nullable(),
  subjectHind: z.string().nullable(),
  note: z.string().nullable(),
  observedAt: z.date(),
  location: z.string().nullable(),
  ruleId: z.string(),
  images:z.string().array()
})
