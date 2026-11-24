import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Annotator } from "@/components/dev/annotator";
import "./framer-shared.css";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valerie Skyler",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={orbitron.variable}>
      <body suppressHydrationWarning>
        {children}
        {/*
          Dev-only copy markup overlay. Two guards keep it out of production:
          this NODE_ENV check (never mounted), and the Turbopack resolveAlias in
          next.config.ts, which resolves the import to a null component so the
          overlay is not bundled at all.
        */}
        {process.env.NODE_ENV !== "production" ? <Annotator /> : null}
      </body>
    </html>
  );
}
