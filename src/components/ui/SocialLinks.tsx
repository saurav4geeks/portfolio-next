import { site } from "@/content/site";
import { HoverUnderlineLink } from "./HoverUnderlineLink";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

/** Short-label social links (LN / GH) used on the banner overlay. */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {site.socials.map((social) => (
        <HoverUnderlineLink
          key={social.label}
          href={social.href}
          aria-label={social.name}
          className="text-sm font-semibold tracking-widest"
        >
          {social.label}
        </HoverUnderlineLink>
      ))}
    </div>
  );
}
