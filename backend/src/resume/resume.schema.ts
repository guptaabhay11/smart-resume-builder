import mongoose, { Schema, model } from "mongoose";
import { IResume } from "./resume.dto";

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    personalInfo: {
      fullName: { type: String, default: "", required: true },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      title: { type: String, default: "" },
      summary: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    skills: [{ type: String }],

    education: [
      {
        institution: { type: String, default: "" },
        degree: { type: String, default: "" },
        year: { type: String, default: "" },
        grade: { type: String, default: "" },
      },
    ],

    experience: [
      {
        company: { type: String, default: "" },
        role: { type: String, default: "" },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    projects: [
      {
        name: { type: String, default: "" },
        description: { type: String, default: "" },
        techStack: [{ type: String }],
        github: { type: String, default: "" },
        link: { type: String, default: "" },
      },
    ],

    url: { type: String, default: "" },
  },
  { timestamps: true } 
);

export default model<IResume>("Resume", ResumeSchema);