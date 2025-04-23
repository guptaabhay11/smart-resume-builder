"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PersonalInfoSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    resumeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Resume",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("PersonalInfo", PersonalInfoSchema);
