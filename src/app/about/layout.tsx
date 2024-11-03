import React from "react";
import { MainLayout } from "../../components/template/Mainlayout";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
