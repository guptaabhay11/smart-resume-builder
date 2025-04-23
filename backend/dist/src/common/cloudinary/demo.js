"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const user_schema_1 = __importDefault(require("../../user/user.schema"));
require('dotenv').config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Use memory storage
const storage = multer_1.default.memoryStorage();
// Use single file upload
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }).single('file');
const uploadToCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ error: 'No file provided' });
            return;
        }
        console.log('Received file:', file.originalname);
        console.log('Buffer length:', file.buffer.length);
        const result = yield new Promise((resolve, reject) => {
            var _a;
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: 'raw',
                folder: `resume/${(_a = req.auth) === null || _a === void 0 ? void 0 : _a.id}`,
            }, (err, uploadResult) => {
                if (err || !uploadResult) {
                    console.error('Cloudinary upload error:', err);
                    return reject(err || new Error('Upload failed'));
                }
                // now update the user in Mongo — no await inside this callback:
                user_schema_1.default
                    .findByIdAndUpdate(req.auth.id, { $push: { pdf: uploadResult.secure_url } }, { new: true })
                    .then((updatedUser) => {
                    if (!updatedUser) {
                        console.error('User not found');
                        return reject(new Error('User not found'));
                    }
                    console.log('User updated with PDF URL:', updatedUser);
                    resolve({ url: uploadResult.secure_url });
                })
                    .catch(reject);
            });
            if (!file.buffer) {
                return reject(new Error('File buffer is missing'));
            }
            uploadStream.end(file.buffer);
        });
        res.status(200).json({ url: result.url });
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
