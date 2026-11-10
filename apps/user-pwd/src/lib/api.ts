import { getBackendURL } from "./backendUrl"

const backendUrl = getBackendURL()

export async function api<T>(url: string, option: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${backendUrl}/v1/api/${url}`, {
      ...option,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...option.headers },
    });

    if (!response.ok) {
      console.log(response);
      const result = await response.json();
      throw new ApiError(response.status,result.message ?? "Failed to fetch");
    }
    return response.json();
  } catch (err) {
    console.log(err)
    return undefined as T
  }
}


export class ApiError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
