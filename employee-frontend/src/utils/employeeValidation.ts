import { z } from "zod";

export const employeeSchema = z.object({
    name: z
        .string()
        .min(3),

    email: z
        .string()
        .email(),

    mobile: z
        .string()
        .regex(
            /^01[0125][0-9]{8}$/,
            "Invalid mobile number"
        ),

    address: z
        .string()
        .min(5),

    title: z
        .string()
        .min(2),

    hire_date: z.string(),

    company: z.number(),

    department: z.number(),

    password: z
        .string()
        .min(6),

    role: z.string()
});