import { Router } from "express";
import * as controllers from '../../controllers/client/category.controller';

const router: Router = Router();

router.get('/', controllers.index)

export const categoryRouters: Router = router;