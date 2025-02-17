import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/tour.controller";
router.get("/", controller.index);
export const tourRouters: Router = router;