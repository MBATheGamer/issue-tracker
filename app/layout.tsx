import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue Tracker",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
