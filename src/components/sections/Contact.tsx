"use client";

import { useForm, ValidationError } from "@formspree/react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoverUnderlineLink } from "@/components/ui/HoverUnderlineLink";

const FORMSPREE_FORM_ID = "xqkjwvpz";

const inputClasses =
  "w-full border border-ink/80 bg-transparent px-6 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  return (
    <section id="section-contact" className="mt-[8%] scroll-mt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <SectionHeading>Get in touch</SectionHeading>

          {state.succeeded ? (
            <p className="mt-8 text-lg text-ink">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-[5%] space-y-5">
              <input
                type="text"
                name="Name"
                placeholder="Name"
                className={inputClasses}
              />
              <div>
                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  className={inputClasses}
                />
                <ValidationError
                  prefix="Email"
                  field="Email"
                  errors={state.errors}
                  className="mt-1 text-sm text-accent"
                />
              </div>
              <input
                type="tel"
                name="Phone"
                placeholder="Phone"
                className={inputClasses}
              />
              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  className={`${inputClasses} resize-none`}
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="mt-1 text-sm text-accent"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-accent px-12 py-4 font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {state.submitting ? "Sending…" : "Submit"}
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
