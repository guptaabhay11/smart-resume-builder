
import { Router } from "express";
import passport from "passport";
import { catchError } from "../common/middleware/catch-error.middleware";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { sendFile } from "../common/helper/sendFile";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import upload from "../common/middleware/multer";
import multer from "multer";
const uploadPdf = multer({ storage: multer.memoryStorage() });
import { authenticateUser } from "../user/auth.middleware";
import { uploadToCloudinary } from "../common/cloudinary/demo";
const router = Router();
router
        .post("/register", userValidator.createUser, catchError, userController.createUser)
        .post("/login", userValidator.login, catchError, passport.authenticate('login', { session: false }), userController.login)
        .get("/me", roleAuth(['USER']), userController.getUserInfo)
        .post("/send-email", upload.single("file"), userController.sendEmail)
        .post("/upload-pdf",authenticateUser, uploadPdf.single('file'), uploadToCloudinary)
       



export default router;