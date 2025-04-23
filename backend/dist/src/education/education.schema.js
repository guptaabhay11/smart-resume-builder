"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EducationSchema = new mongoose_1.Schema({
    school: {
        type: String,
    },
    degree: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Education", EducationSchema);
