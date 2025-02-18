import { NextFunction, Request, Response } from "express";
import { streamUpload } from "../../helpers/streamUpload.helper";
export const uploadSingle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(req["file"]) {
    async function upload(req: Request) {
      let result = await streamUpload((req as any)["file"].buffer);
      req.body[(req as any)["file"].fieldname] = (result as any)["url"];
      next();
    }
    upload(req);
  } else {
    next();
  }
}
export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const key in req["files"]) {
    req.body[key] = [];
    const array = (req as any)["files"][key];
    for (const item of array) {
      try {
        const result = await streamUpload(item.buffer);
        req.body[key].push((result as any)["url"]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  next();
}