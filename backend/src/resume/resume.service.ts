import resumeSchema from "./resume.schema";

import { type IResume } from "./resume.dto";

export const getAllResumes = async (userId: string) => {
   const resumes = await resumeSchema.find({ userId }).sort({ createdAt: -1 });
   return resumes;
}

export const createResume = async (userId: string, resumeData: IResume) => {
    const resume = await resumeSchema.create({ ...resumeData, userId });
    return resume;
}
export const getResumeById = async (id: string) => {
    const resume = await resumeSchema.findById(id).lean();
    return resume;
}