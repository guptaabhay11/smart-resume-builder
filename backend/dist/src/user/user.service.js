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
exports.generateRefreshToken = exports.uploadPdfToCloudinary = exports.addPdfUrlToUser = exports.getUserByEmail = exports.getAllUser = exports.getUserById = exports.createUser = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.create(Object.assign(Object.assign({}, data), { active: true }));
    return result.toObject();
});
exports.createUser = createUser;
// export const updateUser = async (id: string, data: IUser) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
//         new: true,
//     });
//     return result;
// };
// export const editUser = async (id: string, data: Partial<IUser>) => {
//     const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
//     return result;
// };
// export const deleteUser = async (id: string) => {
//     const result = await UserSchema.deleteOne({ _id: id });
//     return result;
// };
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ID", id);
    const result = yield user_schema_1.default.findById(id)
        .select('-password')
        .lean();
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
const uploadPdfToCloudinary = (uploadResult, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield (0, exports.addPdfUrlToUser)(userId, uploadResult.secure_url);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.uploadPdfToCloudinary = uploadPdfToCloudinary;
const generateRefreshToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
