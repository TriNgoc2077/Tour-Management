import { Express } from "express";
import { categoryRoutes } from "./category.router";
import { systemConfig } from "../../config/system";
const adminRouters = (app: Express): void => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  
  app.use(`${PATH_ADMIN}/categories`, categoryRoutes);
};
export default adminRouters;