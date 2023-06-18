"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z
            .string({
            required_error: 'Cow id is required',
        })
            .nonempty(),
        buyer: zod_1.z
            .string({
            required_error: 'Buyer id is required',
        })
            .nonempty(),
    }),
});
exports.default = orderZodSchema;
