import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Скорая помощь при измене",
  description:
    "Пошаговое руководство после измены партнера для женщин, которые хотят справиться с болью и принять решение, о котором не придется жалеть.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
