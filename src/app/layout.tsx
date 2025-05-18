import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/template/MainLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "이재엽 - 성장에 목마른 개발자",
  description: "이재엽 프론트엔드 개발자 포트폴리오",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
