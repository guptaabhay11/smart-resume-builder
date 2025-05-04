import { type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import * as resumeService from "./resume.service";
import { createResponse } from "../common/helper/response.helper";



export const getAllResumes = asyncHandler (async (req: Request, res: Response) => {

   const userId = (req.user as any)?.id;
    const allResume = await resumeService.getAllResumes(userId);
    res.send(createResponse(allResume, "All resumes fetched successfully"));
});

export const createResume = asyncHandler (async (req: Request, res: Response) => {
    const userId = (req.user as any)?.id;
    console.log(req.user)
    console.log(userId);
    console.log(req.body);
    const resumeData = req.body;
    const resume = await resumeService.createResume(userId, resumeData);
    res.send(createResponse(resume, "Resume created successfully"));
});