import { betterAuth } from "better-auth";
import { prismaAdapter } from '@better-auth/prisma-adapter';
import prisma from "./prisma.js";
import { createAuthMiddleware } from "better-auth/api";
import { Course, Departments } from "@sunrise-hub/shared";
import { userDepartmentByCourse } from "../utils/utils.js";

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    }
  },
  basePath: '/api/v1/auth/',
  trustedOrigins: ["http://localhost:5173"],
  emailAndPassword: {
    enabled: true
  },
  advanced: {
    database: {
      joins: true,
    }
  },
  hooks: {
    before: createAuthMiddleware(async(ctx) => {
      console.log(ctx.path)
      if (ctx.path == '/sign-up/email') {
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              department: userDepartmentByCourse(ctx.body.course),
            }
          }
        }
      }
    })
  },
  user: {
    modelName: "users",
    fields: {
      name: "fullname",
    },
    additionalFields: {
      role: {
        type: ["student", "faculty", "staff", "admin"],
        required: false,
        defaultValue: "student",
        input: false,
      },
      collegeId: {
        type: "string",
        required: true,
        unique: true,

      },
      course: {
        type: ["BCA", "BBA", "BCOM"],
        required: true,
      },
      classYear: {
        type: "string",
        required: true,
      },
      department: {
        type: ["computer_application", "business_management"],
        required: true,
        input:true,
      },
      isActive: {
        type: "boolean",
        required: true,
        defaultValue: true
      },
    },
  }
});


export default auth;
