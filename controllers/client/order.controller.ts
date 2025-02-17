import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {

  console.log(req.body);
  
  res.json({});
};