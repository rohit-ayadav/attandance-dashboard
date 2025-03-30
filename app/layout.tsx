import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'BunkMaster Pro | Smart Attendance Management & Prediction',
  description: 'Effortlessly manage your academic attendance with BunkMaster Pro. Real-time calculations, smart predictions, and weekly planning to optimize your attendance strategy. Never worry about attendance requirements again!',

  // Basic metadata
  applicationName: 'BunkMaster Pro',
  authors: [{ name: 'Rohit Kumar Yadav', url: 'https://github.com/rohit-ayadav' }],
  generator: 'Next.js',
  keywords: [
    'attendance calculator',
    'student attendance',
    'attendance tracker',
    'college attendance',
    'attendance management',
    'attendance prediction',
    'academic planning',
    'student tools',
    'education management',
    'attendance optimization'
  ],
  referrer: 'origin-when-cross-origin',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light dark',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
    ],
  },

  // Manifest
  manifest: '/manifest.json?ver=1',

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://bunkmaster-pro.vercel.app',
    title: 'BunkMaster Pro - Smart Attendance Management',
    description: 'Your personal attendance advisor. Track, predict, and optimize your academic attendance with smart calculations and weekly planning.',
    siteName: 'BunkMaster Pro',
    images: [
      {
        url: 'https://bunkmaster-pro.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BunkMaster Pro - Attendance Management Made Easy',
      },
    ],
    locale: 'en_US',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'BunkMaster Pro - Attendance Management Made Easy',
    description: 'Track and optimize your academic attendance with smart predictions and weekly planning. Never miss an attendance target again! 📚✨',
    creator: '@rohit.ayadav',
    images: ['https://bunkmaster-pro.vercel.app/twitter-image.png'],
  },

  // Verification
  verification: {
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // yahoo: 'your-yahoo-verification',
    other: {
      me: ['rohitkuyada@gmail.com'],
    },
  },

  // App specific
  appleWebApp: {
    capable: true,
    title: 'BunkMaster Pro',
    statusBarStyle: 'black-translucent',
  },

  // Robots
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

  // Alternative languages
  alternates: {
    canonical: 'https://bunkmaster-pro.vercel.app',
    languages: {
      'en-US': 'https://bunkmaster-pro.vercel.app/en-US',
    },
  },

  // Category
  category: 'education',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8778160378200057" />
      <meta name="google-adsense-account" content="ca-pub-8778160378200057"></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
