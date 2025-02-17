import { Router } from "express";
import * as controllers from '../../controllers/client/tour.controller';

const router: Router = Router();

router.get('/:slugCategory', controllers.index)
router.get('/detail/:slugTour', controllers.detail)


export const tourRouters: Router = router;