import type { Metadata } from "next";
import "./globals.css";

/* Root Application Metadata. Defines global SEO tags, browser tab title, and page descriptions. */
export const metadata: Metadata = {
  title: "Tibor Lovász | Portfolio",
  description: "Full-Stack Developer Portfolio showcasing projects, skills, and personal vision.",
};

/* Root Layout Shell. Single Responsibility: Serves as the top-level HTML wrapper for all routes. Loads external vector icon stylesheets (Devicon & FontAwesome) globally. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* External CSS Icon Libraries for technical skill badges */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
      </head>
      <body>{children}</body>
    </html>
  );
}