import { type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import * as resumeService from "./resume.service";
import { createResponse } from "../common/helper/response.helper";
import { AuthenticatedRequest } from '../user/auth.middleware'; 
import cloudinary from "../common/cloudinary/cloudinary.config";



export const getAllResumes = asyncHandler (async (req: Request, res: Response) => {

   const userId = (req.user as any)?.id;
    const allResume = await resumeService.getAllResumes(userId);
    res.send(createResponse(allResume, "All resumes fetched successfully"));
});

export const createResume = asyncHandler (async (req: Request, res: Response) => {
    const userId = (req.user as any)?.id;
    const resumeData = req.body;
    const resume = await resumeService.createResume(userId, resumeData);


    
    res.send(createResponse({ id: resume._id }, "Resume created successfully"));
});

export const updateResume = asyncHandler (async (req: Request, res: Response) => {
    const { id } = req.params;
    const resumeData = req.body;
    const resume = await resumeService.updateResume(id, resumeData);
    res.send(createResponse(resume, "Resume updated successfully"));
});

export const deleteResume = asyncHandler (async (req: Request, res: Response) => {
    const { id } = req.params;
    const resume = await resumeService.deleteResume(id);
    res.send(createResponse(resume, "Resume deleted successfully"));
});
export const getResumeById = asyncHandler (async (req: Request, res: Response) => {
    const { id } = req.params;
    const resume = await resumeService.getResumeById(id);
    res.send(createResponse(resume, "Resume fetched successfully"));
}
);

export const uploadToCloudinary = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    if (!file || !file.buffer) {
      res.status(400).json({ error: "No file provided or file buffer missing" });
      return;
    }
    
    console.log("Authenticated User ID:", req.auth?.id);

    const result = await new Promise<{ url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: `resume/${req.auth?.id}`,
        },
        (err, uploadResult) => {
          if (err || !uploadResult) {
            return reject(err || new Error("Upload failed"));
          }
          resolve({ url: uploadResult.secure_url });
        }
      );

      uploadStream.end(file.buffer);
    });

    const updatedUser = await resumeService.addPdfUrlToUser(req.auth!.id, result.url);

    res.send(createResponse(result.url, "File uploaded successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
  


