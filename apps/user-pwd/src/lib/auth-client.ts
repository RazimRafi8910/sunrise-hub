import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",// The base URL of your auth server
  basePath: '/v1/api/better/',
});



export default authClient;
