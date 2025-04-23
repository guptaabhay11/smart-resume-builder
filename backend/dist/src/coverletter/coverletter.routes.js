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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoverLetterValidation = __importStar(require("./coverletter.validation"));
const CoverLetterController = __importStar(require("./coverletter.controller"));
const catch_error_middleware_1 = require("../common/middleware/catch-error.middleware");
const role_auth_middleware_1 = require("../common/middleware/role-auth.middleware");
const rate_limiter_1 = require("../common/helper/rate-limiter");
const router = (0, express_1.Router)();
router
    .get("/", CoverLetterController.getAllCoverLetter)
    .get("/my", (0, role_auth_middleware_1.roleAuth)(["USER"]), CoverLetterController.getCoverLetterByUserId)
    .get("/:id", CoverLetterController.getCoverLetterById)
    .post("/", rate_limiter_1.limiter, CoverLetterValidation.createCoverLetter, catch_error_middleware_1.catchError, CoverLetterController.createCoverLetter)
    .patch("/:id", rate_limiter_1.limiter, catch_error_middleware_1.catchError, CoverLetterController.updateCoverLetter)
    .delete("/:id", rate_limiter_1.limiter, CoverLetterController.deleteCoverLetter);
exports.default = router;
