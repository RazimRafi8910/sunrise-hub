import type { Request, Response } from "express";
import auth from "../../lib/auth.js";
import ApiResponse from "../../lib/apiResponse.js";
import { Departments, Course, ERROR_CODES } from '@sunrise-hub/shared';
import ApiError from "../../lib/apiError.js";

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  // better-auth
  const result = await auth.api.signInEmail({ body: { email, password } });

  if (result.user) {
    return ApiResponse.ok(result.user, "user login success").send(res);
  }
}


export async function signupController(req: Request, res: Response) {
  const { course, } = req.body;
  console.log(req.body)
  const department = course == Course.BCA ? Departments.COMPUTER_SCIENCE : Departments.BUSINESS_MANAGEMENT;
  const userData = {
    name:req.body.fullname,
    ...req.body,
    department
  };

  const result = await auth.api.signUpEmail({ body: userData, returnHeaders: true });
  console.log(result)

  if (result.response.user) {
    return ApiResponse.created<typeof result.response.user>(result.response.user, "user created").send(res);
  }
}


export function getUserController(req: Request, res: Response) {
  const user = req.user;
  console.log(user)
  console.log("session :",req.session)
}
