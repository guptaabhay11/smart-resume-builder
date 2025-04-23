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
exports.uploadPdfToCloudinary = exports.addPdfUrlToUser = exports.getUserByEmail = exports.getAllUser = exports.getUserById = exports.deleteUser = exports.editUser = exports.updateUser = exports.createUser = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier")); // Install with: npm install streamifier
require('dotenv').config();
console.log("process.env.CLOUDINARY_CLOUD_NAME", process.env.CLOUDINARY_CLOUD_NAME);
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.create(Object.assign(Object.assign({}, data), { active: true }));
    return result.toObject();
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
exports.updateUser = updateUser;
const editUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findOneAndUpdate({ _id: id }, data);
    return result;
});
exports.editUser = editUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.deleteOne({ _id: id });
    return result;
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findById(id).lean();
    return result;
});
exports.getUserById = getUserById;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.find({}).lean();
    return result;
});
exports.getAllUser = getAllUser;
const getUserByEmail = (email_1, ...args_1) => __awaiter(void 0, [email_1, ...args_1], void 0, function* (email, withPassword = false) {
    if (withPassword) {
        const result = yield user_schema_1.default.findOne({ email }).select('+password').lean();
        return result;
    }
    const result = yield user_schema_1.default.findOne({ email }).lean();
    return result;
});
exports.getUserByEmail = getUserByEmail;
const addPdfUrlToUser = (id, pdfUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findByIdAndUpdate(id, { $push: { pdf: pdfUrl } }, { new: true }).select('-password');
    return result;
});
exports.addPdfUrlToUser = addPdfUrlToUser;
const uploadPdfToCloudinary = (buffer, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!buffer || buffer.length === 0) {
        throw new Error('Attempting to upload empty buffer');
    }
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: 'raw',
            folder: `resumeBuilder/${userId}`,
            format: 'pdf',
            type: 'upload',
        }, (error, result) => {
            if (error || !result) {
                console.error('Cloudinary upload error:', error);
                return reject(error || new Error('Upload failed'));
            }
            resolve(result.secure_url);
        });
        // Pipe the in‑memory buffer directly into Cloudinary’s stream
        streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
    });
});
exports.uploadPdfToCloudinary = uploadPdfToCloudinary;
