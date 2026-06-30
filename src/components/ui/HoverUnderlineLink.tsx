import { cn } from "@/lib/utils";

interface HoverUnderlineLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

/**
 * Anchor with the site's signature draw-on-hover underline. External links
 * (http/mailto/tel) automatically get safe `target`/`rel` attributes.
 */
export function HoverUnderlineLink({
  href,
  children,
  className,
  ...props
}: HoverUnderlineLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      className={cn("hover-underline", className)}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}
