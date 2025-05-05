import { RequestHandler, Router } from "express";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import * as resumeController from "./resume.controller";
import { authenticateUser } from "../user/auth.middleware";
import multer from "multer";
const uploadPdf = multer({ storage: multer.memoryStorage() });

const router = Router();

router
    .post("/create", roleAuth(['USER']), catchError, resumeController.createResume)
    .patch("/update/:id", roleAuth(['USER']), catchError, resumeController.updateResume)
    .delete("/delete/:id", roleAuth(['USER']), catchError, resumeController.deleteResume)
    .get("/all", roleAuth(['USER']), catchError, resumeController.getAllResumes)
    .post("/upload-pdf", authenticateUser, uploadPdf.single('file'), resumeController.uploadToCloudinary)
    .get("/:id", roleAuth(['USER']), catchError, resumeController.getResumeById);

export default router; 

