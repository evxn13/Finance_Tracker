import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BetaBanner } from "@/components/BetaBanner";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Tracker BETA - Gérez vos finances intelligemment",
  description: "Application de gestion financière personnelle avec conseils IA - Version Beta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <BetaBanner />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
