

export interface ApiSuccess<T> {
  success:true ,
  message: string,
  data: T,
  code?:string,
}

export interface ApiErrorType {
  success: false,
  error: {
    code: string,
    message: string,
    details:string | string[]
  }
}


export type ApiResponse<T> = ApiSuccess<T> | ApiErrorType;
