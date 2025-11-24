import type { Metadata } from "next";
import { Montserrat_Alternates, Inter } from "next/font/google";
import "./globals.css";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anbu Gynaecare",
  description: "Period care that loves you back.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserratAlternates.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
