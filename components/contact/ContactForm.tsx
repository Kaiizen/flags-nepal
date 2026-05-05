"use client";

import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { staggerContainer, staggerItem, transition } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(120, "Keep it under 120 characters"),
  email: z.string().email("Valid email required").max(254),
  phone: z.string().min(7, "Phone number required").max(40, "That phone number seems too long"),
  subject: z.enum(["quote", "bulk", "custom", "support", "other"]),
  message: z
    .string()
    .min(10, "Tell us a bit more (10+ characters)")
    .max(5000, "Please keep the message under 5000 characters"),
  /** Honeypot — hidden from humans, auto-filled by most bots. */
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const subjectValues = ["quote", "bulk", "custom", "support", "other"] as const;
type Subject = (typeof subjectValues)[number];

function resolveSubjectParam(raw: string | null): Subject {
  return subjectValues.includes(raw as Subject) ? (raw as Subject) : "quote";
}

const inputClass =
  "mt-2 w-full rounded-sm border border-charcoal/12 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";

type ContactApiOk = { ok: true; id?: string; skippedEmail?: boolean };
type ContactApiErr = { code?: string };

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  /** `dev-mock` = server accepted the form but did not call Resend (local dev without API key). */
  const [submitOutcome, setSubmitOutcome] = useState<"sent" | "dev-mock">("sent");
  const searchParams = useSearchParams();
  const defaultSubject = resolveSubjectParam(searchParams?.get("subject") ?? null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: defaultSubject,
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as ContactApiOk | ContactApiErr;

      if (!res.ok) {
        const code = "code" in data ? data.code : undefined;
        if (code === "EMAIL_NOT_CONFIGURED") {
          setErrorMessage(
            `This site’s contact form is not connected to email yet. Please write to ${siteConfig.email} or WhatsApp ${siteConfig.phone}.`,
          );
        } else if (code === "EMAIL_DELIVERY_FAILED") {
          setErrorMessage(
            `We could not send that through our mail service. Please email ${siteConfig.email} or call ${siteConfig.phone} with the same details.`,
          );
        } else if (code === "RATE_LIMITED") {
          setErrorMessage(
            `You have sent a few messages already. Please wait a few minutes and try again, or WhatsApp ${siteConfig.phone} for a faster reply.`,
          );
        } else if (code === "VALIDATION" || code === "INVALID_JSON") {
          setErrorMessage("Please check the form fields and try again.");
        } else {
          setErrorMessage(
            `Something went wrong (${res.status}). Please email ${siteConfig.email} or try again in a moment.`,
          );
        }
        setStatus("error");
        return;
      }

      if (!("ok" in data) || data.ok !== true) {
        setErrorMessage(`Please email ${siteConfig.email} if this keeps happening.`);
        setStatus("error");
        return;
      }

      setSubmitOutcome(data.skippedEmail ? "dev-mock" : "sent");
      setStatus("success");
      reset();
    } catch {
      setErrorMessage(
        `Network error—please check your connection, or email ${siteConfig.email} directly.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition.revealSlow}
        className="flex flex-col items-center justify-center rounded-sm border border-gold/20 bg-white p-10 text-center shadow-[0_8px_30px_rgba(15,15,15,0.04)]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition.reveal, delay: 0.06 }}
        >
          <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl text-charcoal">Message received</h3>
        {submitOutcome === "dev-mock" ? (
          <p className="mt-3 max-w-md text-[13px] leading-[1.9] text-charcoal/55">
            <span className="font-medium text-charcoal">Local development:</span> no email was sent to{" "}
            {siteConfig.email} because <code className="rounded bg-charcoal/[0.06] px-1 py-0.5 text-[14px]">RESEND_API_KEY</code> is not set. Add your Resend key to{" "}
            <code className="rounded bg-charcoal/[0.06] px-1 py-0.5 text-[14px]">.env.local</code> to test real delivery.
          </p>
        ) : (
          <p className="mt-3 max-w-md text-[13px] leading-[1.9] text-charcoal/45">
            Our studio will reply within one business day. If your request is urgent, call the number listed alongside this form.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmitOutcome("sent");
          }}
          className="mt-8 rounded-sm border border-charcoal/15 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-gold"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={staggerContainer(0.065, 0.06)}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-sm border border-charcoal/8 bg-white p-6 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-8"
    >
      <motion.div variants={staggerItem} className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Name</label>
          <input {...register("name")} className={inputClass} />
          {errors.name && <p className="mt-1 text-xs text-crimson">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Email</label>
          <input type="email" {...register("email")} className={inputClass} />
          {errors.email && <p className="mt-1 text-xs text-crimson">{errors.email.message}</p>}
        </div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <label className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Phone</label>
        <input {...register("phone")} className={inputClass} />
        {errors.phone && <p className="mt-1 text-xs text-crimson">{errors.phone.message}</p>}
      </motion.div>

      <motion.div variants={staggerItem}>
        <label className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Subject</label>
        <select {...register("subject")} className={inputClass}>
          <option value="quote">Quote request</option>
          <option value="bulk">Bulk / institutional order</option>
          <option value="custom">Custom artwork</option>
          <option value="support">Order support</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && <p className="mt-1 text-xs text-crimson">{errors.subject.message}</p>}
      </motion.div>

      <motion.div variants={staggerItem}>
        <label className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Message</label>
        <textarea rows={5} {...register("message")} className={inputClass} />
        {errors.message && <p className="mt-1 text-xs text-crimson">{errors.message.message}</p>}
      </motion.div>

      {/* Honeypot — kept out of the visible tab order and invisible to humans. Bots */}
      {/* tend to fill every field; a non-empty value will be rejected server-side.  */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label>
          Website
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            {...register("website")}
          />
        </label>
      </div>

      {status === "error" && errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition.fast}
          className="text-sm leading-relaxed text-crimson"
        >
          {errorMessage}
        </motion.p>
      )}

      <motion.div variants={staggerItem}>
        <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
