import { Response } from 'express';

export const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: any = null
): Response => {
  return res.status(status).json({ success, message, data });
};
