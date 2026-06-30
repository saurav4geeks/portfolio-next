import Image from "next/image";
import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HoverUnderlineLink } from "@/components/ui/HoverUnderlineLink";

/** Full-height hero: cover image with social + contact overlays. */
export function Banner() {
  return (
    <section
      id="section-banner"
      className="relative flex h-[100svh] w-full items-end justify-end overflow-hidden"
    >
      <Image
        src="/images/portfolio_banner_crop.png"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 75vw"
        className="object-cover"
      />

      <SocialLinks className="absolute right-[5%] top-[5%] z-10 text-white" />

      <div className="relative z-10 mb-[8%] mr-[5%] hidden text-right text-white lg:block">
        <h6 className="mb-5 text-xl font-semibold tracking-wide">
          LET&apos;S WORK TOGETHER
        </h6>
        <p className="mb-1 text-xl">I&apos;m available at</p>
        <ul className="space-y-1 text-xl">
          <li>
            <HoverUnderlineLink href={`mailto:${site.email}`}>
              {site.email}
            </HoverUnderlineLink>
          </li>
          <li>
            <HoverUnderlineLink href={`tel:${site.phone}`}>
              {site.phoneDisplay}
            </HoverUnderlineLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
