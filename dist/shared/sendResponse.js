"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, { statusCode = http_status_1.default.OK, message = 'success', success = true, data, meta, }) => {
    return res.status(statusCode).json({
        success: success,
        statusCode,
        message,
        data,
        meta: meta ? meta : null,
    });
};
exports.default = sendResponse;
