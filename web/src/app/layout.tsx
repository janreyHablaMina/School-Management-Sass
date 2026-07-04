import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

/** Primary UI font — clean and modern */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Chalkboard / handwritten font for headings */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SchoolSaaS — Learn. Engage. Empower.",
  description: "A modern school management platform that feels like a real classroom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
