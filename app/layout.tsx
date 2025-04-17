import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
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
      <Theme>
        <NavBar />
        <main className="p-4">{children}</main>
      </Theme>
    </body>
  </html>
);
