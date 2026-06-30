import { z } from "zod";

/**
 * Shared contact-form schema — used by the client for inline validation and by
 * the API route as the source of truth. `company` is a honeypot: it is hidden
 * from real users, so any non-empty value indicates a bot.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(1, "Message is required").max(5000),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

export type ContactInput = z.infer<typeof contactSchema>;
