import { z } from "zod";

/** Shared client + server schema for enquiries/bookings. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?88)?01[3-9]\d{8}$/, "invalidPhone"),
  email: z.union([z.literal(""), z.string().trim().email("invalidEmail")]).optional(),
  message: z.string().trim().max(1000).optional(),
  payment: z.enum(["cash", "loan"]).default("cash"),
  context: z.string().max(200).optional(),
  // honeypot: bots fill it, humans never see it
  website: z.string().max(0).optional(),
});
export type EnquiryInput = z.input<typeof enquirySchema>;
