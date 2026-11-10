import type { Response } from "express";

class ApiResponse<T> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T | null;
  public readonly success = true as const;

  constructor(statusCode: number, message: string, data: any,) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static ok<T>(data: T, message: string = "ok") {
    return new ApiResponse<T>(200, message, data);
  }

  static created<T>(data: T, message: string = "created") {
    return new ApiResponse<T>(201, message, data);
  }

  send(res:Response):Response {
    return res.status(this.statusCode).json(this)
  }
}


export default ApiResponse
