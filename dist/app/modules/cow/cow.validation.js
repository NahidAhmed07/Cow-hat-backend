"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidator = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZosSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1._cowLocation], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.string({
            required_error: 'Breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1._cowLabel], {
            required_error: 'Label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1._cowCategory], {
            required_error: 'Category is required',
        }),
        image: zod_1.z.string().optional(),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1._cowLocation]).optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constant_1._cowLabel]).optional(),
        category: zod_1.z.enum([...cow_constant_1._cowCategory]).optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.CowValidator = {
    createCowZosSchema,
    updateCowZodSchema,
};
