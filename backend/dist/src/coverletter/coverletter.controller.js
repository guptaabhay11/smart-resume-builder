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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoverLetterById = exports.getCoverLetterByUserId = exports.deleteCoverLetter = exports.updateCoverLetter = exports.createCoverLetter = exports.getAllCoverLetter = void 0;
const CoverLetterService = __importStar(require("./coverletter.service"));
const response_helper_1 = require("../common/helper/response.helper");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * Fetches all cover letters.
 * @route GET /cover-letters
 * @access public
 * @returns A list of all cover letters.
 */
exports.getAllCoverLetter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield CoverLetterService.getAllCoverLetter();
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Fetched Successfully"));
}));
/**
 * Creates a new cover letter.
 * @route POST /cover-letters
 * @access private
 * @param req.body - The cover letter data to create.
 * @returns The created cover letter.
 */
exports.createCoverLetter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield CoverLetterService.createCoverLetter(req.body);
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Created Successfully"));
}));
/**
 * Updates an existing cover letter.
 * @route PATCH /cover-letters/:id
 * @access private
 * @param req.params.id - The ID of the cover letter to update.
 * @param req.body - The updated cover letter data.
 * @returns The updated cover letter.
 */
exports.updateCoverLetter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield CoverLetterService.updateCoverLetter(id, req.body);
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Updated Successfully"));
}));
/**
 * Deletes a cover letter.
 * @route DELETE /cover-letters/:id
 * @access private
 * @param req.params.id - The ID of the cover letter to delete.
 * @returns The deleted cover letter.
 */
exports.deleteCoverLetter = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield CoverLetterService.deleteCoverLetter(id);
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Deleted Successfully"));
}));
/**
 * Fetches cover letters of the current user.
 * @route GET /cover-letters/my
 * @access private
 * @returns The cover letters of the current user.
 */
exports.getCoverLetterByUserId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield CoverLetterService.getCoverLetterByUserId(id);
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Fetched Successfully"));
}));
/**
 * Fetches a specific cover letter by ID.
 * @route GET /cover-letters/:id
 * @access public
 * @param req.params.id - The ID of the cover letter to fetch.
 * @returns The cover letter with the specified ID.
 */
exports.getCoverLetterById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield CoverLetterService.getCoverLetterById(id);
    res.send((0, response_helper_1.createResponse)(result, "Cover Letter Fetched Successfully"));
}));
