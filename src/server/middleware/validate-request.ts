import { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues });
      }
      return res.status(400).json({ error: 'Invalid request' });
    }
  };
}

