
import { type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { createUserTokens } from '../common/services/passport-jwt.services';
import { type IUser } from "./user.dto";
import { sendFile } from "../common/helper/sendFile";
import { v2 as cloudinary } from 'cloudinary';
import * as userService from "./user.service";
// Ensure uploadPdfToCloudinary is part of userService

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    const { password, ...user } = result;
    res.send(createResponse(user, "User created sucssefully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted sucssefully"))
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as Omit<IUser, "password">;
    const tokens = createUserTokens(user);
    res.send(createResponse(tokens))
});


export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as any)?._id;
    const user = await userService.getUserById(userId);
    res.send(createResponse(user))
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    // To do: Remove session
    res.send(createResponse({}))
});

export const sendEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, subject, html } = req.body;
          const file = req.file;
        
          console.log(req.body)
          console.log(file)
        
          if (!file) {
            throw new Error("Failed to file not found");
          }
        
          const filePath = file.path;
          const fileName = file.originalname;
        
          const result = await sendFile({
            email,
            subject,
            html,
            filePath,
            fileName,
          });
        
          if (result) {
            res.send(createResponse(result, "File Sent Successfully"));
        
          } else {
        
            throw new Error("Failed to send file");
          }})



          export const uploadPdf = asyncHandler(async (req: Request, res: Response) => {
            const userId = (req.user as any)?._id;
            const file = req.file as Express.Multer.File;
          
            if (!userId) {
               res.status(401).json({ success: false, message: 'Not authenticated' });
               return
            }
            console.log(file)

            if (!file || !file.buffer || file.buffer.length === 0) {
               res.status(400).json({ success: false, message: 'No PDF provided' });
               return
            }
            if (file.mimetype !== 'application/pdf') {
               res.status(400).json({ success: false, message: 'Only PDFs allowed' });
               return
            }
          
            try {
              const url = await userService.uploadPdfToCloudinary(file.buffer, userId);
               res.status(200).json({ success: true, url });
               return
            } catch (err: any) {
              console.error('Upload failed:', err);
               res.status(500).json({ success: false, message: err.message });
               return
            }
          });
          