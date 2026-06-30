import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-[6%]">
      <p className="text-[13px] italic text-muted">
        © {year} {site.name}, All Rights Reserved.
      </p>
    </footer>
  );
}
