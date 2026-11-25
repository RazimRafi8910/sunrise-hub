import type { Request, Response } from 'express';
import { getStorageObjectUrl, getStoragePutUrl } from '../../../lib/storage.js';
import { ReportImageBucket } from '../../../config/constants.js';
import ApiResponse from '../../../lib/apiResponse.js';
import ApiError from '../../../lib/apiError.js';
import { ERROR_CODES } from '@sunrise-hub/shared';

export const reportImageUrl = async (req: Request, res: Response) => {
  const user = req.user;
  const { contentType, filename } = req.body;

  const result = await getStoragePutUrl(filename, contentType, ReportImageBucket);

  if (!result.status) {
    return new ApiError(ERROR_CODES.BAD_REQUEST,result.message)
  }
    return ApiResponse.ok(result, "put url created").send(res);
}

export const createReport = (req: Request, res: Response) => {

}

export const getAllReport = (req:Request, res:Response) => {

}

export const getReport = (req:Request, res:Response) => {

}

export const updateReport = (req:Request, res:Response) => {

}

export const deleteReport =  (req:Request, res:Response) => {

}
