
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'; // Install with: npm install streamifier


require('dotenv').config();



export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data, active: true });
    return result.toObject();
};

export const updateUser = async (id: string, data: IUser) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editUser = async (id: string, data: Partial<IUser>) => {
    const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await UserSchema.deleteOne({ _id: id });
    return result;
};

export const getUserById = async (id: string) => {
  console.log("ID", id);
  const result = await UserSchema.findById(id)
    .select('-password') 
    .lean();
  return result;
};

export const getAllUser = async () => {
    const result = await UserSchema.find({}).lean();
    return result;
};
export const getUserByEmail = async (email: string, withPassword = false) => {
    if (withPassword) {
        const result = await UserSchema.findOne({ email }).select('+password').lean();
        return result;
    }
    const result = await UserSchema.findOne({ email }).lean();
    return result;
}

export const addPdfUrlToUser = async (id: string, pdfUrl: string) => {
  const result = await UserSchema.findByIdAndUpdate(
    id,
    { $push: { pdf: pdfUrl } },
    { new: true }
  ).select('-password');
  
  return result;
};


export const uploadPdfToCloudinary = async (uploadResult: any, userId: string) => {
  try {
    const updatedUser = await addPdfUrlToUser(userId, uploadResult.secure_url);
    
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};


 

