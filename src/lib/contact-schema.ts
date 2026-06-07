import { z } from "zod";

/** Shared contact form schema — validated on both client and server. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(100),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Please add a subject.").max(150),
  message: z
    .string()
    .min(10, "Your message is a little short.")
    .max(5000, "Please keep it under 5000 characters."),
  /** Honeypot — must stay empty (bots tend to fill every field). */
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
