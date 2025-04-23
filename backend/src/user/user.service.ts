
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'; // Install with: npm install streamifier


require('dotenv').config();
console.log("process.env.CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const result = await UserSchema.findById(id).lean();
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


export const uploadPdfToCloudinary = async (
    buffer: Buffer,
    userId: string
  ): Promise<string> => {
    if (!buffer || buffer.length === 0) {
      throw new Error('Attempting to upload empty buffer');
    }
  
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: `resumeBuilder/${userId}`,
          format: 'pdf',
          type: 'upload',
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            return reject(error || new Error('Upload failed'));
          }
          resolve(result.secure_url);
        }
      );
  
      // Pipe the in‑memory buffer directly into Cloudinary’s stream
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  };