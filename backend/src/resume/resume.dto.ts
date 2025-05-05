import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IResume extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId; // Reference to the user who owns the resume
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        title: string;
        summary: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
    skills: string[];
    experience: {
        companyName: string;
        position: string;
        startDate: Date;
        endDate: Date;
        description: string;
    }[];
    education: {
        institutionName: string;
        degree: string;
        startDate: Date;
        endDate: Date;
    }[];
    projects: {
        title: string;
        description: string;
        link?: string;
    }[];
    url: string; 
    createdAt:string;
    updatedAt: string;
}