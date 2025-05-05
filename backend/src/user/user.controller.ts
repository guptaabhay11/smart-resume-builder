
import { type Request, type Response } from 'express';
import { AuthenticatedRequest } from './auth.middleware'; 
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { createUserTokens } from '../common/services/passport-jwt.services';
import { type IUser } from "./user.dto";
import { sendFile } from "../common/helper/sendFile";
import * as userService from "./user.service";
import cloudinary from "../common/cloudinary/cloudinary.config";
import jwt from "jsonwebtoken";


export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    const { password, ...user } = result;
    res.send(createResponse(user, "User created successfully"))
});

// export const updateUser = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.updateUser(req.params.id, req.body);
//     res.send(createResponse(result, "User updated successfully"))
// });

// export const editUser = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.editUser(req.params.id, req.body);
//     res.send(createResponse(result, "User updated successfully"))
// });

// export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
//     const result = await userService.deleteUser(req.params.id);
//     res.send(createResponse(result, "User deleted successfully"))
// });


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as Omit<IUser, "password" & "pdf">;
    const tokens = createUserTokens(user);
    res.send(createResponse(tokens))
});


export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as any)?.id;
    console.log("User ID", userId);

    const user = await userService.getUserById(userId);
    res.send(createResponse(user))
});


export const sendEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, subject, html } = req.body;
  const file = req.file;
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
  }
});


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

    // Add the PDF URL as a new resume reference in the user's pdf array
    const updatedUser = await userService.addPdfUrlToUser(req.auth!.id, result.url);

    res.send(createResponse(result.url, "File uploaded successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
  
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { userId: string, role: string };
    const accessToken = userService.generateRefreshToken(decoded.userId, decoded.role);
    throw new Error("User not found");
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
})

