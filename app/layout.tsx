import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "Issue Tracker",
};

type Props = {
  children: ReactNode;
};

export default ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body>
      <NavBar />
      <main>{children}</main>
    </body>
  </html>
);
