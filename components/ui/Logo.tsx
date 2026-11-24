import Image from "next/image";
import Link from "next/link";

export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="40 210 330 375" aria-hidden="true">
      <path d="M50 395 C 165 392 172 560 50 557" fill="none" stroke="currentColor" strokeWidth="36" />
      <rect x="50" y="461" width="72" height="30" fill="#0B6B47" />
      <path d="M180 572 C 225 520 240 450 225 395 C 205 330 150 300 115 275 C 95 260 85 240 85 220 C 100 255 140 280 175 300 C 215 325 240 355 245 385 C 255 345 300 325 355 318 C 300 335 265 365 255 410 C 248 460 255 520 290 572 Z" fill="currentColor" />
      <path d="M240 345 C 230 290 270 245 338 236 C 330 300 295 335 240 345 Z" fill="#0B6B47" />
    </svg>
  );
}

/** Official DSQ lock-up (from drshahidqureshi.com). Swap for the vector master when supplied. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo" aria-label="Dr. Shahid Qureshi — home">
      <Image src="/img/site/dsq-logo.webp" alt="Dr. Shahid Qureshi — Promoting Purpose Driven Entrepreneurship" width={186} height={48} priority className="logo-img" />
    </Link>
  );
}
