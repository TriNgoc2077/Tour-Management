import { Express } from "express";
import { tourRouters } from "./tour.router";

const clientRouters = (app: Express): void => {
    app.use('/tours', tourRouters);
}

export default clientRouters;