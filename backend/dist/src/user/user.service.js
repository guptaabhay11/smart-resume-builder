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
require('dotenv').config();
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
    console.log(result);
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
        console.error("Error updating user with PDF URL:", error);
        throw error;
    }
});
exports.uploadPdfToCloudinary = uploadPdfToCloudinary;
