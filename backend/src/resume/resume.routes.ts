import { Router } from "express";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as resumeController from "./resume.controller";


const router = Router();

router
    .post("/create", catchError, resumeController.createResume);

export default router;    