"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonalInfo = void 0;
const express_validator_1 = require("express-validator");
exports.createPersonalInfo = [
    (0, express_validator_1.body)("fullName")
        .notEmpty()
        .withMessage("fullName is required")
        .isString()
        .withMessage("fullName must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isString()
        .withMessage("email must be a string"),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("phone is required")
        .isString()
        .withMessage("phone must be a string"),
    (0, express_validator_1.body)("address")
        .notEmpty()
        .withMessage("address is required")
        .isString()
        .withMessage("address must be a string"),
];
