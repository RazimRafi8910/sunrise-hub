import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client, type GetObjectCommandOutput, type HeadObjectCommandOutput } from '@aws-sdk/client-s3';
import env from '../config/env.js';
import crypto from 'node:crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { ErrorCode } from '@sunrise-hub/shared';
import type { keyof } from 'zod';


const ALLOWED_FILE_TYPE = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
])

const BUCKET = env.DEFAULT_BUCKET


const storageClient = new S3Client({
  region: env.AWS_REGION,
  endpoint: env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const StorageErrorCode = {
  INVALID_VALUES: 'INVALID_VALUES',
  FAILED_CREATE: 'FAILED_CREATE',
  INVALID_FILE_TYPE:'INVALID_FILE_TYPE'
} as const

export type StorageErrorCodeType = keyof typeof StorageErrorCode

type GetStoragePutUrlType= {
  status: boolean,
  message: string,
  objectUrl?: string | null
  imageKey?: string | null
  code?:StorageErrorCodeType
}

type GetObjectMetaType= {
  status: boolean,
  message: string,
  objectMeta?:HeadObjectCommandOutput | null
}

type GetObjectUrlType = {
  status: boolean,
  message: string,
  objectUrl?:string | null
}

type GetStorageObject = {
  status: boolean,
  message: string,
  object?:GetObjectCommandOutput | null
}

export const getStoragePutUrl = async (filename: string, contentType: string, bucket: string, imageId?: string): Promise<GetStoragePutUrlType> => {
  if (!filename || !contentType) {
    return {
      status: false,
      code:StorageErrorCode.INVALID_VALUES,
      message:`${!filename ? "Filename is missing" : "content type is missing" }`,
    }
  }

  if (!ALLOWED_FILE_TYPE.has(contentType)) {
    return {
      status: false,
      code:StorageErrorCode.INVALID_FILE_TYPE,
      message:"file type not supported",
    }
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const imageKey = imageId != null ? `images/${imageId}-${safeName}` : `images/${crypto.randomUUID()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: bucket ? bucket : BUCKET,
    Key: imageKey,
    ContentType: contentType,
  });

  try {
    const ObjectUrl = await getSignedUrl(storageClient, command, { expiresIn: 300 });
    return {
      status: true,
      message: "url created",
      objectUrl: ObjectUrl,
      imageKey:imageKey
    }
  } catch (e) {
    console.error(`[storage getStoragePutUrl]`)
    console.log(e)
    return {
      status: false,
      code:StorageErrorCode.FAILED_CREATE,
      message: "url not created",
      objectUrl:null
    }
  }
}


export const getStorageObjectMeta = async (imageKey: string, bucket: string):Promise<GetObjectMetaType> => {
  if (!imageKey || !bucket) {
    return {
      status: false,
      message:"Imagekey or bucket is null"
    }
  }

  try {
    const objectMeta = await storageClient.send(new HeadObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    }));

    return {
      status: true,
      message: "objectMeta found",
      objectMeta,
    }
  } catch (e: any) {
    if (e?.name === 'NotFound' || e?.$metadata?.httpStatusCode === 404) {
      return { status: false, message: 'object not found' };
    }
    console.error('[storage getStorageObjectMeta]', e);
    return { status: false, message: 'storage error' };
  }
}


export const getStorageObjectUrl = async (imageKey:string, bucket:string):Promise<GetObjectUrlType> => {
  if (!imageKey || !bucket) {
    return {
      status: false,
      message:"Imagekey or bucket is null"
    }
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    });

    const preSignedUrl = await getSignedUrl(storageClient, command, { expiresIn: 600 });

    return {
      status: true,
      message: "objectMeta found",
      objectUrl:preSignedUrl
    }
  } catch (e) {
    console.error("[storage getObject]")
    console.log(e)
    return {
      status: false,
      message: "objectMeta not found",
      objectUrl:null
    }
  }
}


export const getStorageObject = async (imageKey:string, bucket:string):Promise<GetStorageObject> => {
  if (!imageKey || !bucket) {
    return {
      status: false,
      message:"Imagekey or bucket is null"
    }
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: imageKey,
    });

    const object = await storageClient.send(command);

    return {
      status: true,
      message: "objectMeta found",
      object
    }
  } catch (e) {
    console.error("[storage getObject]")
    console.log(e)
    return {
      status: false,
      message: "object not found",
      object:null
    }
  }
}
