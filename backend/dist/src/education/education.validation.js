"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEducation = void 0;
const express_validator_1 = require("express-validator");
exports.createEducation = [
    (0, express_validator_1.body)("education.*.school")
        .notEmpty()
        .withMessage("school is required")
        .isString()
        .withMessage("school must be a string"),
    (0, express_validator_1.body)("education.*.degree")
        .notEmpty()
        .withMessage("degree is required")
        .isString()
        .withMessage("degree must be a string"),
    (0, express_validator_1.body)("education.*.startDate")
        .notEmpty()
        .withMessage("startDate is required")
        .isString()
        .withMessage("startDate must be a string"),
    (0, express_validator_1.body)("education.*.endDate")
        .notEmpty()
        .withMessage("endDate is required")
        .isString()
        .withMessage("endDate must be a string"),
];
