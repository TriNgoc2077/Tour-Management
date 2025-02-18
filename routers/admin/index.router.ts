import { Express } from "express";
import { categoryRoutes } from "./category.router";
import { systemConfig } from "../../config/system";
import { tourRouters } from "./tour.router";
import { uploadRouters } from "./upload.router";
const adminRouters = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  
  app.use(`${PATH_ADMIN}/categories`, categoryRoutes);
  app.use(`${PATH_ADMIN}/tours`, tourRouters);
  app.use(`${PATH_ADMIN}/upload`, uploadRouters);
};
export default adminRouters;