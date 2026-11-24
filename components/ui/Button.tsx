import Link from "next/link";
import { Icon } from "./Icon";

type Variant = "primary" | "ghost" | "emerald";

export function Button({
  href,
  children,
  variant = "primary",
  size,
  arrow = true,
  className = "",
  external,
  trackId,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "lg";
  arrow?: boolean;
  className?: string;
  external?: boolean;
  trackId?: string;
}) {
  const cls = `btn btn-${variant}${size === "lg" ? " btn-lg" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && variant !== "ghost" && <Icon name="arrow" />}
    </>
  );
  if (href.startsWith("#"))
    return (
      <a href={href} className={cls} data-cta={trackId}>
        {inner}
      </a>
    );
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener" data-cta={trackId}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls} data-cta={trackId}>
      {inner}
    </Link>
  );
}

export function whatsappHref(number: string | null, text: string) {
  const n = number || "920000000000";
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}
