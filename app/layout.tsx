import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://psy-lending.netlify.app'),
  title: "Скорая помощь при измене",
  description:
    "Пошаговое руководство после измены партнера для женщин, которые хотят справиться с болью и принять решение, о котором не придется жалеть.",
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo.png', 
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        sizes: '48x48',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    shortcut: '/logo.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logo.png',
      }
    ]
  },
  openGraph: {
    title: "Скорая помощь при измене",
    description: "Пошаговое руководство после измены партнера для женщин, которые хотят справиться с болью и принять решение, о котором не придется жалеть.",
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Скорая помощь при измене", 
    description: "Пошаговое руководство после измены партнера для женщин, которые хотят справиться с болью и принять решение, о котором не придется жалеть.",
    images: ['/logo.png'],
  }
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
