import { Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { AuthenticatedRequest } from '../../user/auth.middleware';
import userSchema from '../../user/user.schema';

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage
const storage = multer.memoryStorage();
// Use single file upload
export const upload = multer({ storage: multer.memoryStorage() }).single('file');

export const uploadToCloudinary = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: 'No file provided' });
        return;
      }
  
      console.log('Received file:', file.originalname);
      console.log('Buffer length:', file.buffer.length);
  
      const result = await new Promise<{ url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: `resume/${req.auth?.id}`,
          },
          (err, uploadResult) => {
            if (err || !uploadResult) {
              console.error('Cloudinary upload error:', err);
              return reject(err || new Error('Upload failed'));
            }
      
            // now update the user in Mongo — no await inside this callback:
            userSchema
              .findByIdAndUpdate(
                req.auth!.id,
                { $push: { pdf: uploadResult.secure_url } },
                { new: true }
              )
              .then((updatedUser) => {
                if (!updatedUser) {
                  console.error('User not found');
                  return reject(new Error('User not found'));
                }
                console.log('User updated with PDF URL:', updatedUser);
                resolve({ url: uploadResult.secure_url });
              })
              .catch(reject);
          }
        );
      
        if (!file.buffer) {
          return reject(new Error('File buffer is missing'));
        }
        uploadStream.end(file.buffer);
      });
        res.status(200).json({ url: result.url });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };
  

  