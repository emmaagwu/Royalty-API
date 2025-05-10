// File: src/controllers/authController.ts
import { Request, Response } from 'express';
import { signupUser, loginUser } from '../services/authService';
import { sendResponse } from '../utils/sendResponse';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await signupUser(req.body);    
    sendResponse(res, result.status, true, result.body.message, result.body.data);
  } catch (err) {
    sendResponse(res, 500, false, 'Server error');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginUser(req.body);
    sendResponse(res, result.status, true, result.body.message, result.body.data);
  } catch (err) {
    sendResponse(res, 500, false, 'Server error');
  }
};