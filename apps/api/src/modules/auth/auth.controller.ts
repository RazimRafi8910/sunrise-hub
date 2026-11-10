import type { Request, Response } from "express";
import auth from "../../lib/auth.js";
import ApiResponse from "../../lib/apiResponse.js";
import { Departments, Course } from '@sunrise-hub/shared';

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
  const department = course == Course.BCA ? Departments.COMPUTER_SCIENCE : Departments.BUSINESS_MANAGEMENT;
  const userData = {
    ...req.body,
    department
  };

  const result = await auth.api.signUpEmail({ body: userData });
}
