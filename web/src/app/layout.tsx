import type { Metadata } from "next";
import { Inter, Caveat, Londrina_Solid } from "next/font/google";
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

/** Bold chalk font for tags and titles */
const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: "400",
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
      className={`${inter.variable} ${caveat.variable} ${londrinaSolid.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
