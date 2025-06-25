import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import MainLayout from "@/components/template/MainLayout";

export const metadata: Metadata = {
  title: "이재엽 - 성장에 목마른 개발자",
  description:
    "사용자 경험과 성능을 동시에 고려하는 프론트엔드 개발자 이재엽 3d 포트폴리오",
  keywords: [
    "프론트엔드 개발자",
    "프론트엔드 개발자 포트폴리오",
    "프론트엔드 포트폴리오",
    "포트폴리오",
    "3d 포트폴리오",
    "프론트엔드 3d 포트폴리오",
    "Frontend Engineer",
    "Frontend Engineer Portfolio",
    "Frontend Engineer 3d Portfolio",
    "React",
    "Next.js",
    "React Three Fiber",
    "Three.js",
    "Observability",
  ],
  authors: [{ name: "이재엽", url: "https://leejaeyeop-blog.vercel.app/" }],
  creator: "이재엽",
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
