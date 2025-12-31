import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anuj — Personal Site",
  description: "A calm, modern personal site built with Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
