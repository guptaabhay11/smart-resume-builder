"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.sendEmail = exports.getUserInfo = exports.login = exports.getAllUser = exports.getUserById = exports.deleteUser = exports.editUser = exports.updateUser = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const response_helper_1 = require("../common/helper/response.helper");
const passport_jwt_services_1 = require("../common/services/passport-jwt.services");
const sendFile_1 = require("../common/helper/sendFile");
const userService = __importStar(require("./user.service"));
const cloudinary_config_1 = __importDefault(require("../common/cloudinary/cloudinary.config"));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.createUser(req.body);
    const { password } = result, user = __rest(result, ["password"]);
    res.send((0, response_helper_1.createResponse)(user, "User created successfully"));
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.updateUser(req.params.id, req.body);
    res.send((0, response_helper_1.createResponse)(result, "User updated successfully"));
}));
exports.editUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.editUser(req.params.id, req.body);
    res.send((0, response_helper_1.createResponse)(result, "User updated successfully"));
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.deleteUser(req.params.id);
    res.send((0, response_helper_1.createResponse)(result, "User deleted successfully"));
}));
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.getUserById(req.params.id);
    res.send((0, response_helper_1.createResponse)(result));
}));
exports.getAllUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.getAllUser();
    res.send((0, response_helper_1.createResponse)(result));
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const tokens = (0, passport_jwt_services_1.createUserTokens)(user);
    res.send((0, response_helper_1.createResponse)(tokens));
}));
exports.getUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const user = yield userService.getUserById(userId);
    res.send((0, response_helper_1.createResponse)(user));
}));
exports.sendEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subject, html } = req.body;
    const file = req.file;
    if (!file) {
        throw new Error("Failed to file not found");
    }
    const filePath = file.path;
    const fileName = file.originalname;
    const result = yield (0, sendFile_1.sendFile)({
        email,
        subject,
        html,
        filePath,
        fileName,
    });
    if (result) {
        res.send((0, response_helper_1.createResponse)(result, "File Sent Successfully"));
    }
    else {
        throw new Error("Failed to send file");
    }
}));
const uploadToCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file || !file.buffer) {
            res.status(400).json({ error: "No file provided or file buffer missing" });
            return;
        }
        const result = yield new Promise((resolve, reject) => {
            var _a;
            const uploadStream = cloudinary_config_1.default.uploader.upload_stream({
                resource_type: "auto",
                folder: `resume/${(_a = req.auth) === null || _a === void 0 ? void 0 : _a.id}`,
            }, (err, uploadResult) => {
                if (err || !uploadResult) {
                    console.error("Cloudinary upload error:", err);
                    return reject(err || new Error("Upload failed"));
                }
                resolve({ url: uploadResult.secure_url });
            });
            uploadStream.end(file.buffer);
        });
        const updatedUser = yield userService.addPdfUrlToUser(req.auth.id, result.url);
        res.send((0, response_helper_1.createResponse)(result.url, "File uploaded successfully"));
    }
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
