import { z } from 'zod';

const orderZodSchema = z.object({
  body: z.object({
    cow: z
      .string({
        required_error: 'Cow id is required',
      })
      .nonempty(),
    buyer: z
      .string({
        required_error: 'Buyer id is required',
      })
      .nonempty(),
  }),
});

export default orderZodSchema;
