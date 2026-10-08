import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./atlas.css";
import "./scrollytelling.css";
const serif = localFont({
  src: [
    {
      path: "../../public/fonts/cormorant.ttf",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant-italic.ttf",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = localFont({
  src: "../../public/fonts/jakarta.ttf",
  weight: "200 800",
  variable: "--font-plus-jakarta",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Jordan — The Heritage Atlas",
  description:
    "Explore Jordan through an interactive atlas of ancient wonders, wild landscapes, and living heritage.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jordan Atlas",
  },
  openGraph: {
    title: "Jordan — The Heritage Atlas",
    description: "A small kingdom. A world of wonder.",
    images: [
      {
        url: "/images/petra.jpg",
        width: 1920,
        height: 1080,
        alt: "Petra, Jordan",
      },
    ],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d110f",
};
import { LanguageProvider } from "@/context/LanguageContext";
import MotionProvider from "@/components/MotionProvider";
import { HeritageCanvasBackground } from "@/components/ui/HeritageCanvasBackground";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import CommandPalette from "@/components/CommandPalette";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="bg-transparent relative">
        <ServiceWorkerRegistration />
        <HeritageCanvasBackground />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LanguageProvider>
          <MotionProvider>
            <CommandPalette />
            <div id="main-content" className="relative z-10">{children}</div>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
