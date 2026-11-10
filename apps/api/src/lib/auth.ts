import { betterAuth } from "better-auth";
import { prismaAdapter } from '@better-auth/prisma-adapter';
import prisma from "./prisma.js";

const auth = betterAuth({
  database: prismaAdapter(prisma, {
      provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge:5 * 60,
    }
  },
  basePath: '/v1/api/better/',
  trustedOrigins:["http://localhost:5173"],
    emailAndPassword: {
        enabled:true
    },
    advanced: {
        database: {
            joins:true,
        }
    },
    user: {
        modelName: "users",
        fields: {
            name:"fullname",
        },
        additionalFields: {
            role: {
                type: ["student", "faculty", "staff", "admin"],
                required: false,
                defaultValue: "student",
                input:false
            },
            collegeId: {
                type: "string",
                required: true,
                unique: true,

            },
            course: {
                type: ["BCA","BBA","BCOM"],
                required: true,
            },
            classYear: {
                type: "string",
                required:true,
            },
            department: {
                type: ["computer_application", "business_management"],
                required:true,
            },
            isActive: {
                type: "boolean",
                required: true,
                defaultValue:true
            },
        },
    }
})


export default auth;
