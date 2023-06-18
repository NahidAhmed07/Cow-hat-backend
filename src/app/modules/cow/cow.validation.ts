import { z } from 'zod';
import { _cowCategory, _cowLabel, _cowLocation } from './cow.constant';

const createCowZosSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([..._cowLocation] as [string], {
      required_error: 'Location is required',
    }),
    breed: z.string({
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum([..._cowLabel] as [string], {
      required_error: 'Label is required',
    }),
    category: z.enum([..._cowCategory] as [string], {
      required_error: 'Category is required',
    }),
    image: z.string().optional(),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([..._cowLocation] as [string]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.enum([..._cowLabel] as [string]).optional(),
    category: z.enum([..._cowCategory] as [string]).optional(),
    image: z.string().optional(),
  }),
});

export const CowValidator = {
  createCowZosSchema,
  updateCowZodSchema,
};
