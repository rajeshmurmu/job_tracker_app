import { z } from "zod";

export const applicationSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" }),
  position: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  location: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  applied_date: z.date(),
  salary: z.string().optional(),
  job_url: z.string().optional(),
  notes: z.string().optional(),
});
