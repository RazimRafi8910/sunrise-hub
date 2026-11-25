import type { ApiErrorType, ApiResponse, ApiSuccess } from "@sunrise-hub/shared";
import { getBackendURL } from "./utils"

const backendUrl = getBackendURL()

export async function api<T>(url: string, option: RequestInit = {}):Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${backendUrl}${url}`, {
      ...option,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...option.headers },
    });

    if (!response.ok) {
      console.log(response);
      const result = await response.json() as ApiErrorType
      throw new ApiError(response.status,result.error.message ?? "Failed to fetch");
    }
    const result = await response.json()
    return result as ApiSuccess<T>
  } catch (err) {
    console.log(err)
    return undefined as ApiResponse<T>
  }
}


export class ApiError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}


export const BetterAuthErrorCode = {
  USER_ALREADY_EXISTS:"User already exists with same email, please login",
}
