import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jaredalonzo.dev";

export const metadata: Metadata = {
  title: {
    default: "Jared Alonzo",
    template: "%s | Jared Alonzo",
  },
  description: "Engineering writing by Jared Alonzo.",
  metadataBase: new URL(BASE_URL),
  authors: [{ name: "Jared Alonzo", url: BASE_URL }],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Jared Alonzo",
    title: "Jared Alonzo",
    description: "Engineering writing by Jared Alonzo.",
  },
  twitter: {
    card: "summary",
    title: "Jared Alonzo",
    description: "Engineering writing by Jared Alonzo.",
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <div className="max-w-4xl mx-auto w-full px-4 pt-4 flex justify-end">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
