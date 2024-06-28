import { z } from 'zod';
import { email, message, name } from './common';

export const schema = z.object({
  name: z.string()
    .min(4, { message: "Field must be at least 4 characters long" })
    .max(50, { message: "Field must be at most 50 characters long" })
    .trim()
    .refine(val => val.trim().length >= 4, {
      message: "Minimum 4 characters and no spaces",
    }),
  email: z.string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email address" })
    .max(50, { message: "Field must be at most 50 characters long" })
    .trim()
    .refine(val => val.trim().length > 0, {
      message: "Field cannot be empty or just spaces",
    }),
  message: z.string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Field must be at most 1000 characters long" })
    .trim()
    .refine(val => val.trim().length > 0, {
      message: "Field cannot be empty or just spaces",
    }),
  rating: z.number({ message: "Please choose a rating" })
});


export const testimonialSchema = z.object({
  name,
  email,
  message,
  rating: z.number({ message: "Please choose a rating" })
})