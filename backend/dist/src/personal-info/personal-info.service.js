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
exports.getPersonalInfoById = exports.deletePersonalInfo = exports.updatePersonalInfo = exports.createPersonalInfo = exports.getAllPersonalInfo = void 0;
const personal_info_schema_1 = __importDefault(require("./personal-info.schema"));
const getAllPersonalInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personal_info_schema_1.default.find().lean();
    return result;
});
exports.getAllPersonalInfo = getAllPersonalInfo;
const createPersonalInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personal_info_schema_1.default.create(Object.assign({}, data));
    return result;
});
exports.createPersonalInfo = createPersonalInfo;
const updatePersonalInfo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personal_info_schema_1.default.findByIdAndUpdate(id, Object.assign({}, data), { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Personal Info not found");
    }
    return result;
});
exports.updatePersonalInfo = updatePersonalInfo;
const deletePersonalInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personal_info_schema_1.default.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Personal Info not found");
    }
    return result;
});
exports.deletePersonalInfo = deletePersonalInfo;
const getPersonalInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield personal_info_schema_1.default.findById(id).lean();
    return result;
});
exports.getPersonalInfoById = getPersonalInfoById;
