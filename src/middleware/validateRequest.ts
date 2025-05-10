import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(),
      });
      return; // ✅ Exit the function instead of returning a Response object
    }

    req.body = result.data; // You can safely overwrite with parsed data
    next();
  };
};
