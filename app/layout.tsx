import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Champion Futsal - Booking Lapangan Futsal Mudah dan Cepat",
  description: "Champion Futsal adalah platform booking lapangan futsal terpercaya. Cari dan booking lapangan futsal dengan mudah, cepat, dan aman.",
  keywords: ["futsal", "booking lapangan", "sewa lapangan futsal", "lapangan olahraga", "champion futsal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
