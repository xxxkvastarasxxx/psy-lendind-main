import type { Metadata } from "next";
import { Prata } from "next/font/google";
import "./globals.css";

const prata = Prata({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-prata",
  display: "swap",
});

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
      <head>
        {/* Meta Pixel Code - Client Side Only */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '601820907333071');
                fbq('track', 'PageView');
              })();
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=601820907333071&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={prata.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
