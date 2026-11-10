import {ERROR_CODES, ERROR_STATUS, type ErrorCode } from '@sunrise-hub/shared';

class ApiError extends Error {
  public readonly status: number;
  public readonly code: ErrorCode;
  readonly details: string | string[] = [];

  constructor(code: ErrorCode, message?: string, details:string | string[] = []) {
    super(message ?? code);
    this.code = code;
    this.name = "Api Error"
    this.status = ERROR_STATUS[code];
    this.details = details
  }
}

export default ApiError;
