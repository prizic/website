"use client";

import { useActionState, useEffect, useRef } from "react";

import { type InquiryState, sendInquiry } from "@/app/contact/actions";
import type { SiteContent } from "@/content/types";
import { HONEYPOT_FIELD, INQUIRY_LIMITS, type InquiryField } from "@/lib/inquiry";

type FormCopy = SiteContent["pages"]["contact"]["form"];

const control =
  "mt-2 block w-full rounded-action border border-line bg-paper-bright px-4 py-3 text-base text-ink placeholder:text-muted/80 aria-invalid:border-ink aria-invalid:border-2";

type FieldProps = {
  copy: FormCopy;
  name: InquiryField;
  label: string;
  state: InquiryState;
  optional?: boolean;
  type?: "text" | "email" | "url";
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
};

function fieldError(state: InquiryState, name: InquiryField) {
  return state.status === "invalid" ? state.fieldErrors[name] : undefined;
}

function fieldValue(state: InquiryState, name: InquiryField) {
  return state.status === "invalid" || state.status === "failed"
    ? state.values[name] ?? ""
    : "";
}

function Field({ copy, name, label: text, state, optional = false, type = "text", autoComplete, placeholder, multiline = false }: FieldProps) {
  const error = fieldError(state, name);
  const describedBy = error ? `${name}-error` : undefined;
  const shared = {
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    className: control,
    defaultValue: fieldValue(state, name),
    id: name,
    maxLength: name === "topic" ? undefined : INQUIRY_LIMITS[name],
    name,
    placeholder,
    required: !optional,
  };

  return (
    <div className={multiline ? "col-span-full" : undefined}>
      <label className="text-sm font-semibold" htmlFor={name}>
        {text}
        {optional ? <span className="font-normal text-muted"> — {copy.optional}</span> : null}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} />
      ) : (
        <input {...shared} autoComplete={autoComplete} type={type} />
      )}
      {error ? (
        <p className="mt-2 mb-0 text-sm font-semibold" id={`${name}-error`}>{error}</p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ copy }: { copy: FormCopy }) {
  const [state, action, pending] = useActionState(sendInquiry, { status: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  const topicError = fieldError(state, "topic");

  // Move focus to the outcome so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "sent" || state.status === "failed") statusRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="rounded-spread bg-accent p-8 text-accent-ink lg:p-10" ref={statusRef} role="status" tabIndex={-1}>
        <p className="m-0 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.04em]">{copy.success}</p>
      </div>
    );
  }

  return (
    <form action={action} aria-label="Project inquiry" className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-spread bg-panel p-8 lg:p-10 max-md:grid-cols-1 max-md:p-6">
      {state.status === "failed" ? (
        <div className="col-span-full rounded-panel bg-ink p-5 text-paper-bright" ref={statusRef} role="alert" tabIndex={-1}>
          <p className="m-0 text-[0.9375rem] leading-normal">{copy.error}</p>
        </div>
      ) : null}

      <Field copy={copy} autoComplete="name" label={copy.name} name="name" state={state} />
      <Field copy={copy} autoComplete="organization" label={copy.businessName} name="business_name" state={state} />
      <Field copy={copy} autoComplete="email" label={copy.email} name="email" state={state} type="email" />
      <Field copy={copy} autoComplete="url" label={copy.website} name="website" optional state={state} type="text" />

      <fieldset aria-describedby={topicError ? "topic-error" : undefined} className="col-span-full m-0 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 text-sm font-semibold">{copy.topic}</legend>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          {copy.topics.map((topic) => (
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-action border border-line bg-paper-bright px-4 py-3 text-sm has-checked:border-ink has-checked:bg-ink has-checked:text-paper-bright" key={topic.value}>
              <input
                className="size-4 accent-current"
                defaultChecked={fieldValue(state, "topic") === topic.value}
                name="topic"
                required
                type="radio"
                value={topic.value}
              />
              {topic.label}
            </label>
          ))}
        </div>
        {topicError ? <p className="mt-2 mb-0 text-sm font-semibold" id="topic-error">{topicError}</p> : null}
      </fieldset>

      <Field copy={copy} label={copy.message} multiline name="message" placeholder={copy.messagePlaceholder} state={state} />
      <Field copy={copy} label={copy.budget} name="budget" optional placeholder={copy.budgetPlaceholder} state={state} />
      <Field copy={copy} label={copy.timing} name="timing" optional placeholder={copy.timingPlaceholder} state={state} />

      {/* Hidden from people and assistive tech; bots fill every field. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input autoComplete="off" id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} type="text" />
      </div>

      <div className="col-span-full flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-action border-0 bg-ink px-5 py-3 text-sm font-semibold text-paper-bright transition-colors duration-160 ease-out hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink disabled:cursor-progress disabled:opacity-70 motion-reduce:transition-none"
          disabled={pending}
          type="submit"
        >
          {pending ? copy.submitting : copy.submit}
        </button>
        <p className="m-0 text-sm text-muted">{copy.supportingText}</p>
      </div>
    </form>
  );
}
