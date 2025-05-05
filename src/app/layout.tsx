import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dubaicalendar.com'),
  title: 'DFRE Templates',
  description: 'Explore Dubai Calendar - Your Ultimate Guide to Events in Dubai',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon-32x32.png'],
    apple: [
      { url: '/favicon-32x32.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dubaicalendar.com',
    siteName: 'DFRE Templates',
    title: 'DFRE Templates',
    description: 'Explore Dubai Calendar - Your Ultimate Guide to Events in Dubai',
    images: [
      {
        url: '/images/card1.jpg',
        width: 1200,
        height: 630,
        alt: 'DFRE Templates',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DFRE Templates',
    description: 'Explore Dubai Calendar - Your Ultimate Guide to Events in Dubai',
    images: ['/images/card1.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="share-tracking">
          {`
            // Simple share tracking function
            window.trackShare = function(platform) {
              console.log('Share event:', platform);
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 