import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tibor Lovász | Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Devicon CDN fallback layer since you prefer semantic className icons */}
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}