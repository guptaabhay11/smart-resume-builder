"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoverLetter = void 0;
const express_validator_1 = require("express-validator");
exports.createCoverLetter = [
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .withMessage("userId is required")
        .isString()
        .withMessage("userId must be a string"),
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is required")
        .isString()
        .withMessage("title must be a string"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("content is required")
        .isString()
        .withMessage("content must be a string"),
];
