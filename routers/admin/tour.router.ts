import { Router } from "express";
import multer from 'multer';
import * as controller from "../../controllers/admin/tour.controller";
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();
const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create", 
    upload.fields([
        { name: 'images', maxCount: 10 },
    ]),
    uploadFields,
    controller.createPost);
export const tourRouters: Router = router;