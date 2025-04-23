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
exports.getCoverLetterByUserId = exports.deleteCoverLetter = exports.updateCoverLetter = exports.createCoverLetter = exports.getCoverLetterById = exports.getAllCoverLetter = void 0;
const coverletter_schema_1 = __importDefault(require("./coverletter.schema"));
/**
 * Retrieves all cover letters
 * @returns {Promise<ICoverLetter[]>} Array of cover letters
 */
const getAllCoverLetter = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.find().lean();
    return result;
});
exports.getAllCoverLetter = getAllCoverLetter;
/**
 * Retrieves a specific cover letter by id
 * @param {string} id - The id of the cover letter
 * @returns {Promise<ICoverLetter | null>} The cover letter with the specified id
 */
const getCoverLetterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.findById(id).lean();
    return result;
});
exports.getCoverLetterById = getCoverLetterById;
/**
 * Creates a new cover letter
 * @param {ICoverLetter} data - The data of the cover letter to create
 * @returns {Promise<ICoverLetter>} The newly created cover letter
 */
const createCoverLetter = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.create(Object.assign({}, data));
    return result;
});
exports.createCoverLetter = createCoverLetter;
/**
 * Updates a specific cover letter
 * @param {string} id - The id of the cover letter to update
 * @param {ICoverLetter} data - The data of the cover letter to update
 * @returns {Promise<ICoverLetter | null>} The updated cover letter
 */
const updateCoverLetter = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.findByIdAndUpdate(id, Object.assign({}, data), { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Cover Letter not found");
    }
    return result;
});
exports.updateCoverLetter = updateCoverLetter;
/**
 * Deletes a specific cover letter
 * @param {string} id - The id of the cover letter to delete
 * @returns {Promise<ICoverLetter | null>} The deleted cover letter
 */
const deleteCoverLetter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Cover Letter not found");
    }
    return result;
});
exports.deleteCoverLetter = deleteCoverLetter;
/**
 * Retrieves all cover letters of a specific user
 * @param {string} userId - The id of the user
 * @returns {Promise<ICoverLetter[]>} Array of cover letters of the user
 */
const getCoverLetterByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coverletter_schema_1.default.find({ userId: userId }).lean();
    return result;
});
exports.getCoverLetterByUserId = getCoverLetterByUserId;
