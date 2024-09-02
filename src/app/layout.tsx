import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { PageLayout } from "@/components";

export const metadata: Metadata = {
  title: "OP Stack Bridge",
  description: "Next generation of Defi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
