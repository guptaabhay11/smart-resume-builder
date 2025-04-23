"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    console.log("token from middle", token);
    if (!token) {
        res.status(401).json({ success: false, message: 'No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.auth = { id: decoded._id, role: decoded.role };
        console.log("req.auth", req.auth);
        console.log("req.id", req.auth.id);
        next();
    }
    catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
exports.authenticateUser = authenticateUser;
