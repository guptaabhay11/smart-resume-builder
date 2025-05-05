import resumeSchema from "./resume.schema";
import mongoose from "mongoose";
import { type IResume } from "./resume.dto";
import User from "../user/user.schema";
export const getAllResumes = async (userId: string) => {
   const resumes = await resumeSchema.find({ userId }).sort({ createdAt: -1 });
   return resumes;
}

export const createResume = async (userId: string, resumeData: IResume) => {
  console.log("Resume data", resumeData);
    const resume = await resumeSchema.create({
      ...resumeData,
      userId: new mongoose.Types.ObjectId(userId),
      personalInfo: {
        ...resumeData.personalInfo, 
      },
    });
   const urlUp =  await User.findByIdAndUpdate(userId, {
      $push: { pdf: resume._id },
    });
    console.log("User updated with resume ID", urlUp);
  
  
    return resume;
  };
  
export const getResumeById = async (id: string) => {
    const resume = await resumeSchema.findById(id).lean();
    return resume;
}

export const updateResume = async (id: string, resumeData: Partial<IResume>) => {
    const resume = await resumeSchema.findByIdAndUpdate(id, resumeData, {
        new: true,
    });
    return;
}
export const deleteResume = async (id: string) => {
    const resume = await resumeSchema.findByIdAndDelete(id);
    if (!resume) {
        throw new Error("Resume not found");
    }
    return ;
}


export const addPdfUrlToUser = async (id: string, pdfUrl: string) => {
  const result = await resumeSchema.findByIdAndUpdate(
    id,
    { $push: { url: pdfUrl } },
    { new: true }
  ).select('-password');
  
  return result;
};