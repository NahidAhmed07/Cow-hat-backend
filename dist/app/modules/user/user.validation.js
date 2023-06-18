"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string({
            required_error: 'Phone number is required',
        }),
        role: zod_1.default.enum(['seller', 'buyer'], {
            required_error: 'Role is required',
        }),
        password: zod_1.default
            .string({
            required_error: 'Password is required',
        })
            .min(6, {
            message: 'Password Should be at least 6 characters long',
        }),
        name: zod_1.default.object({
            firstName: zod_1.default.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.default.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.default.string({
            required_error: 'Address is required',
        }),
        budget: zod_1.default.number({
            required_error: 'Budget is required',
        }),
        income: zod_1.default.number({
            required_error: 'Income is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string().optional(),
        role: zod_1.default.enum(['seller', 'buyer']).optional(),
        password: zod_1.default
            .string()
            .min(6, {
            message: 'Password Should be at least 6 characters long',
        })
            .optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        })
            .optional(),
        address: zod_1.default.string().optional(),
        budget: zod_1.default.number().optional(),
        income: zod_1.default.number().optional(),
    }),
});
exports.UserValidator = {
    createUserZodSchema,
    updateUserZodSchema,
};
