import express from "express";

const router = express.Router();

import * as controller from "../../controllers/client/order.controller";

router.post("/", controller.index);

export const orderRouters = router;