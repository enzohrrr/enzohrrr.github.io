"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Public Web3Forms access key (safe to expose — keys are public by design). */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    // Honeypot hit — silently succeed.
    if (values.company) {
      reset();
      toast.success("Thanks! Your message has been sent.");
      return;
    }

    if (!ACCESS_KEY) {
      toast.error(`Email isn't configured yet. Please reach me at ${siteConfig.email}.`);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            name: values.name,
            email: values.email,
            subject: `[Portfolio] ${values.subject}`,
            message: values.message,
            from_name: "Portfolio Contact",
          }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Thanks! Your message has been sent.");
          reset();
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot field, hidden from real users. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <Label htmlFor="company">Company</Label>
        <Input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message}>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="jane@studio.com"
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject?.message}>
        <Input
          id="subject"
          placeholder="Let's work together"
          {...register("subject")}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project, team, or role…"
          {...register("message")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isPending}>
        <Send className="size-4" />
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p
        className={cn(
          "text-sm text-destructive transition-opacity",
          error ? "opacity-100" : "opacity-0"
        )}
        role={error ? "alert" : undefined}
      >
        {error ?? " "}
      </p>
    </div>
  );
}
