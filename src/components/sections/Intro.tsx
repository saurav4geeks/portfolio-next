import Image from "next/image";
import { intro } from "@/content/intro";

/** Biography: large statement, supporting copy + photo, and a side blurb. */
export function Intro() {
  const { heading, paragraphs, side } = intro;

  // Split the side body so the emphasised phrase can be tinted with the accent.
  const [before, after] = side.emphasis
    ? side.body.split(side.emphasis)
    : [side.body, ""];

  return (
    <section id="section-intro" className="mt-[8%] scroll-mt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <h2 className="mb-[8%] font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
            {heading}
          </h2>
          <div className="max-w-[90%] space-y-5 text-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Image
            src="/images/intro-img.jpg"
            alt="Saurav at work"
            width={1200}
            height={675}
            sizes="(max-width: 1024px) 90vw, 50vw"
            className="mt-8 h-auto w-[90%] rounded-sm"
          />
        </div>

        <aside className="lg:pt-2">
          <h4 className="text-xl font-semibold">{side.heading}</h4>
          <p className="mt-4 max-w-[90%] text-sm leading-6">
            {before}
            {side.emphasis && <span className="text-accent">{side.emphasis}</span>}
            {after}
          </p>
        </aside>
      </div>
    </section>
  );
}
