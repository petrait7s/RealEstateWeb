"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Enquiry/booking-request form. Submission is stubbed until the Supabase `leads` API lands. */
export function EnquiryForm({ context, compact }: { context?: string; compact?: boolean }) {
  const t = useTranslations("form");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { payment: "cash", context },
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700)); // TODO: POST /api/leads
    setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="text-success size-10" />
        <p>{t("thanks")}</p>
      </div>
    );
  }

  const err = (k: keyof EnquiryInput) => {
    const m = errors[k]?.message;
    return m ? (
      <p className="text-danger mt-1 text-xs" role="alert">
        {m === "invalidPhone" || m === "invalidEmail" ? t(m) : t("required")}
      </p>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {context && <p className="bg-surface-2 rounded-md px-3 py-2 text-sm">{context}</p>}
      <div>
        <label
          htmlFor="f-name"
          className="text-muted mb-1.5 block text-xs tracking-wider uppercase"
        >
          {t("name")}
        </label>
        <Input id="f-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        {err("name")}
      </div>
      <div>
        <label
          htmlFor="f-phone"
          className="text-muted mb-1.5 block text-xs tracking-wider uppercase"
        >
          {t("phone")}
        </label>
        <Input
          id="f-phone"
          type="tel"
          autoComplete="tel"
          placeholder="01XXXXXXXXX"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {err("phone")}
      </div>
      <div>
        <label
          htmlFor="f-email"
          className="text-muted mb-1.5 block text-xs tracking-wider uppercase"
        >
          {t("email")}
        </label>
        <Input
          id="f-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {err("email")}
      </div>
      {!compact && (
        <div>
          <label
            htmlFor="f-msg"
            className="text-muted mb-1.5 block text-xs tracking-wider uppercase"
          >
            {t("message")}
          </label>
          <textarea
            id="f-msg"
            rows={3}
            className="border-border bg-surface focus:border-accent w-full rounded-md border px-4 py-3 text-sm focus:outline-none"
            {...register("message")}
          />
        </div>
      )}
      <fieldset>
        <legend className="text-muted mb-1.5 text-xs tracking-wider uppercase">
          {t("payment")}
        </legend>
        <div className="flex gap-4 text-sm">
          {(["cash", "loan"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                value={v}
                className="accent-[var(--accent)]"
                {...register("payment")}
              />{" "}
              {t(v)}
            </label>
          ))}
        </div>
      </fieldset>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
