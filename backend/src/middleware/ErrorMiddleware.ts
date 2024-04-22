import { NextFunction, Request, Response } from "express";

export const asynchandler =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({
        success: false,
      });
    }
  };
