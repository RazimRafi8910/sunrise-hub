import type { Request, Response } from "express";
import auth from "../../lib/auth.js";
import ApiResponse from "../../lib/apiResponse.js";
import { Departments, Course, ERROR_CODES, UserRoles } from '@sunrise-hub/shared';
import ApiError from "../../lib/apiError.js";
import type { User } from "better-auth";
import prisma from "../../lib/prisma.js";
import { fromNodeHeaders } from "better-auth/node";

export async function loginController(req: Request, res: Response) {
  const { email, password, adminPortal } = req.body;
  let user: User;

  // better-auth
  const result = await auth.api.signInEmail({ body: { email, password }, headers: fromNodeHeaders(req.headers) });

  //admin login
  if (adminPortal && result.user.role !== UserRoles.STUDENT) {
    const adminUser = await prisma.admins.findFirst({ where: { userId: result.user.id } });

    if (!adminUser) {
      return new ApiError("UNAUTHORIZED_ERROR", "user is not admin");
    }


  }

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
