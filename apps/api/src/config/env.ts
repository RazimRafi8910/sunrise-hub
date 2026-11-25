
const env = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  AWS_ENDPOINT_URL_S3:process.env.AWS_ENDPOINT_URL_S3 || "",
  AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  DEFAULT_BUCKET: process.env.BUCKET || 'uploads',
  REPORT_IMAGE_BUCKET:process.env.REPORT_IMAGE_BUCKET || 'uploads'
}

export default env;
