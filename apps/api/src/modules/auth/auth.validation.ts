import z from 'zod'


export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "Minimun 8 chartecter should be"),
});

export const signupSchema = z.object({
  email: z.email(),
  fullname: z.string().min(3),
  password: z.string().min(8),
  college_id_no: z.string(),
  course: z.string(),
  class_year:z.string()
})

export type SignupSchema = z.infer<typeof signupSchema>
export type LoginSchema = z.infer<typeof loginSchema>
