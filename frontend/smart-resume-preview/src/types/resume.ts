
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentJob?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "USER" | "ADMIN";
  pdf?: string[];
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}
  
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}