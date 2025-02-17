import { Router } from "express";
import * as controllers from '../../controllers/client/cart.controller';

const router: Router = Router();

router.get('/', controllers.index)
router.post("/list", controllers.list);

export const cartRouters: Router = router;