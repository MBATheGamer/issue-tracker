import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue Tracker",
};

type Props = {
  children: ReactNode;
};

export default ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);
