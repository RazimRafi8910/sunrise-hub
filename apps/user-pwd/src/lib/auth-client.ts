import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",// The base URL of your auth server
  basePath: '/api/v1/auth/',
});

const ErrorCodesMessage:Record<string,string> ={
  ACCOUNT_NOT_FOUND: "Account not found, signup",
  USER_ALREADY_EXISTS: "Email already in use, please login",
  INVALID_EMAIL_OR_PASSWORD: "Invalid Password or Email",
  VALIDATION_ERROR:"Invalid input",
}

export const getAuthErrorCodeMsg = (code) => {
  if (code in ErrorCodesMessage) {
    return ErrorCodesMessage[code]
  } else {
    //developement
    console.log("unhandled code:", code);
    return "Failed to authenticate, try again leter"
  }
}

export default authClient;
