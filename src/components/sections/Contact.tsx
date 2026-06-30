"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoverUnderlineLink } from "@/components/ui/HoverUnderlineLink";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[] | undefined>;

const inputClasses =
  "w-full border border-ink/80 bg-transparent px-6 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => ({}));
      setFieldErrors(body.fieldErrors ?? {});
      setErrorMessage(body.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setErrorMessage("Network error — please check your connection and retry.");
      setStatus("error");
    }
  }

  return (
    <section id="section-contact" className="mt-[8%] scroll-mt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <SectionHeading>Get in touch</SectionHeading>

          {status === "success" ? (
            <p className="mt-8 text-lg text-ink">
              Thanks for reaching out — your message has been received. I&apos;ll
              get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-[5%] space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={inputClasses}
                  aria-invalid={!!fieldErrors.name}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-accent">{fieldErrors.name[0]}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClasses}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-accent">{fieldErrors.email[0]}</p>
                )}
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className={inputClasses}
              />

              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  className={`${inputClasses} resize-none`}
                  aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-accent">
                    {fieldErrors.message[0]}
                  </p>
                )}
              </div>

              {/* Honeypot — hidden from users, attractive to bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "error" && errorMessage && (
                <p className="text-sm text-accent">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-accent px-12 py-4 font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-10 lg:pt-2">
          <div>
            <h4 className="text-xl font-semibold">CONTACT ME</h4>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li className="uppercase tracking-wide">{site.name}</li>
              <li>
                <HoverUnderlineLink
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-accent-hover"
                >
                  {site.email}
                </HoverUnderlineLink>
              </li>
              <li>
                <HoverUnderlineLink
                  href={`tel:${site.phone}`}
                  className="transition-colors hover:text-accent-hover"
                >
                  {site.phoneDisplay}
                </HoverUnderlineLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold">WHERE TO FIND ME</h4>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-muted">
              {site.socials.map((social) => (
                <li key={social.name}>
                  <HoverUnderlineLink
                    href={social.href}
                    className="transition-colors hover:text-accent-hover"
                  >
                    {social.name}
                  </HoverUnderlineLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
