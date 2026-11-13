import { z } from 'zod';
import { Course } from '../types/constants.js';


export const loginZodSchema = z.object({
  email: z.email("please provide a valid email"),
  password: z.string().min(8),
});


export const signupZodSchema = z.object({
  fullname: z.string().min(3, { message: "atleast 3 characters" }),
  email: z.email(),
  password: z.string().min(8, { message: "password must be 8 charecters" }),
  collegeId: z.string().min(6, { error: "Invalid college Id" }),
  course: z.enum(Course),
  classYear: z.string(),
});
