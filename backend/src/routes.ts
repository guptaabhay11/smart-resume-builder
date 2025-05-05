import express from "express";
import userRoutes from "./user/user.routes";
import resumeRoutes from "./resume/resume.routes";

// routes
const router = express.Router();


router.use("/resumes", resumeRoutes);
router.use("/users", userRoutes);


export default router;