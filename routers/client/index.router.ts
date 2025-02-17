import { Express } from "express";
import { tourRouters } from "./tour.router";
import { categoryRouters } from "./category.router";
import { cartRouters } from "./cart.router";
import { orderRouters } from "./order.router";
const clientRouters = (app: Express): void => {
    app.use('/tours', tourRouters);
    app.use('/categories', categoryRouters);
    app.use('/cart', cartRouters);
    app.use('/order', orderRouters);
}

export default clientRouters;