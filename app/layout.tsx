import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
