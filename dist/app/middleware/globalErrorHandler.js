"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const config_1 = require("../../config");
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../../errors/handleZodValidationError"));
const handleMongooseValidationError_1 = __importDefault(require("../../errors/handleMongooseValidationError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errorMessages = [];
    // handle mongoose validation error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleMongooseValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // handle zod validation error
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ message: error.message, path: '' }]
            : [];
    }
    // handle Error class this is default express error class
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        // message = error
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ message: error.message, path: '' }]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.config.env === 'development' ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
