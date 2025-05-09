import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
};

type Props = {
  children: ReactNode;
};

export default ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body className={inter.variable}>
      <AuthProvider>
        <Theme radius="large">
          <NavBar />
          <main className="p-4">
            <Container>{children}</Container>
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </AuthProvider>
    </body>
  </html>
);
