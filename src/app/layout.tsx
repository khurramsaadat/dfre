import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dfre.netlify.app/'),
  title: {
    default: 'Layout Factory - Professional Layout Creation for DM and DS',
    template: '%s | Layout Factory'
  },
  description: 'Create professional layouts for DM approvals and Design Studio projects. Professional layout creation tool for DFRE templates and pole location documentation.',
  keywords: [
    'Layout Factory',
    'DM',
    'DM 6 Assets',
    'DM 3 Assets',
    'Design Studio',
    'DFRE Templates',
    'Layout Creation',
    'Dubai Approval',
    'Professional Layouts',
    'Pole Locations',
    'Khurram'
  ],
  authors: [{ name: 'Khurram Saadat' }],
  creator: 'Khurram Saadat',
  publisher: 'Layout Factory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
    url: 'https://dfre.netlify.app/',
    siteName: 'Layout Factory',
    title: 'Layout Factory - Professional Layout Creation for DM',
    description: 'Create professional layouts for DM approvals and Design Studio projects. Professional layout creation tool for DFRE templates.',
    images: [
      {
        url: '/images/card1.jpg',
        width: 1200,
        height: 630,
        alt: 'Layout Factory - Professional Layout Creation',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layout Factory - Professional Layout Creation',
    description: 'Create professional layouts for DM approvals and design studio projects.',
    images: ['/images/card1.jpg'],
    creator: '@layoutfactory',
  },
  alternates: {
    canonical: 'https://dfre.netlify.app/',
  },
  category: 'Web Application',
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