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
exports.updateEducation = exports.deleteEducation = exports.getEducationById = exports.getAllEducation = exports.createEducation = void 0;
const education_schema_1 = __importDefault(require("./education.schema"));
/**
 * Creates a new education entry in the database.
 * @param data The data for the education entry, in the format of IEducation.
 * @returns The newly created education entry.
 */
const createEducation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_schema_1.default.insertMany(data);
    return result;
});
exports.createEducation = createEducation;
/**
 * Retrieves all education entries from the database.
 * @returns A promise that resolves to an array of all education entries in the database.
 */
const getAllEducation = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_schema_1.default.find().lean();
    return result;
});
exports.getAllEducation = getAllEducation;
/**
 * Retrieves an education entry by its ID from the database.
 * @param id - The unique identifier of the education entry to retrieve.
 * @returns A promise that resolves to the education entry if found, or null if not found.
 */
const getEducationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_schema_1.default.findById(id).lean();
    return result;
});
exports.getEducationById = getEducationById;
/**
 * Deletes an education entry by its ID from the database.
 * @param id - The unique identifier of the education entry to delete.
 * @returns A promise that resolves to the deleted education entry if found and deleted.
 * @throws {Error} If the education entry is not found.
 */
const deleteEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_schema_1.default.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Education not found");
    }
    return result;
});
exports.deleteEducation = deleteEducation;
/**
 * Updates an existing education entry in the database.
 * @param id - The unique identifier of the education entry to update.
 * @param data - The updated data for the education entry, in the format of IEducation.
 * @returns A promise that resolves to the updated education entry if found and updated.
 * @throws {Error} If the education entry is not found.
 */
const updateEducation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield education_schema_1.default.findByIdAndUpdate(id, Object.assign({}, data), { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Education not found");
    }
    return result;
});
exports.updateEducation = updateEducation;
