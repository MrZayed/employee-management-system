import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export const employeeSchema = z.object({
  first_name: z.string().min(2),

  last_name: z.string().min(2),

  email: z.email(),

  mobile_number: z
    .string()
    .regex(/^01[0125][0-9]{8}$/),

  company: z.number(),

  department: z.number(),
});