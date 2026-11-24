import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/ui/Analytics";
import "./brand.css";
import "./globals.css";

const url = process.env.NEXT_PUBLIC_SITE_URL || "https://drshahidqureshi.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "GCE Batch 10, Global Certificate in Entrepreneurship | Dr. Shahid Qureshi", template: "%s | GCE Batch 10 · Dr. Shahid Qureshi" },
  description:
    "You don't need more resources to begin. You need a different way of thinking. Join Dr. Shahid Qureshi's internationally recognised Global Certificate in Entrepreneurship, Batch 10.",
  openGraph: {
    title: "GCE Batch 10, Change the Way You Think. Change What You Can Build.",
    description: "The entrepreneurship program behind two USASBE recognitions (2017 & 2021). Live online. Practical frameworks. A global community.",
    images: ["/img/usasbe-award-2.webp"],
    type: "website",
  },
  icons: { icon: "/img/dsq-mark.svg" },
};

export const viewport: Viewport = { themeColor: "#003D2B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Montserrat:wght@700;800&family=Poppins:wght@500;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
