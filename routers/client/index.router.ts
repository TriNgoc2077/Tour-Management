import { Express } from "express";
import { tourRouters } from "./tour.router";
import { categoryRouters } from "./category.router";
const clientRouters = (app: Express): void => {
    app.use('/tours', tourRouters);
    app.use('/categories', categoryRouters);
}

export default clientRouters;