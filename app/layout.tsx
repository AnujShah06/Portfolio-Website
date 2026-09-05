import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Anuj Shah — ML Systems Engineer",
  description:
    "Purdue CS '28. ML systems engineer building OSINT ingestion, hybrid retrieval, and decision-support models for the defense world.",
  keywords: [
    "Anuj Shah",
    "machine learning",
    "MLOps",
    "defense",
    "Purdue",
    "RAG",
    "PyTorch",
  ],
  openGraph: {
    title: "Anuj Shah — ML Systems Engineer",
    description:
      "Purdue CS '28. ML systems engineer building OSINT ingestion, hybrid retrieval, and decision-support models for the defense world.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070d1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}
      <Analytics />
      </body>
    </html>
  );
}
