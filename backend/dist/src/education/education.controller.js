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
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getAllEducation = void 0;
const EducationService = __importStar(require("./education.service"));
const response_helper_1 = require("../common/helper/response.helper");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * Fetches all education entries.
 * @route GET /education
 * @access public
 * @returns A list of all education entries.
 */
exports.getAllEducation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield EducationService.getAllEducation();
    res.send((0, response_helper_1.createResponse)(result, "Education Fetched Successfully"));
}));
/**
 * Creates a new education entry.
 * @route POST /education
 * @access public
 * @param req.body - The education data to create.
 * @returns The created education entry.
 */
exports.createEducation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield EducationService.createEducation(req.body);
    res.send((0, response_helper_1.createResponse)(result, "Education Created Successfully"));
}));
/**
 * Updates an existing education entry.
 * @route PATCH /education/:id
 * @access public
 * @param req.params.id - The ID of the education entry to update.
 * @param req.body - The updated education data.
 * @returns The updated education entry.
 */
exports.updateEducation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield EducationService.updateEducation(id, req.body);
    res.send((0, response_helper_1.createResponse)(result, "Education Updated Successfully"));
}));
/**
 * Deletes an education entry.
 * @route DELETE /education/:id
 * @access public
 * @param req.params.id - The ID of the education entry to delete.
 * @returns The deleted education entry.
 */
exports.deleteEducation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield EducationService.deleteEducation(id);
    res.send((0, response_helper_1.createResponse)(result, "Education Deleted Successfully"));
}));
