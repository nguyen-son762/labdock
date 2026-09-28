import type { ReactNode } from "react";

import "./globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
