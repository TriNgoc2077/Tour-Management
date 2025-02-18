import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  res.json({
    location: req.body.file
  });
};