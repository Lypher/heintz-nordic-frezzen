import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Heintz Nordic Frezzen - Importør og distributør af frossent kaninkød i Danmark",
  description: "Heintz Nordic Frezzen er importør og distributør af frossent kaninkød i Danmark.",
  keywords: "frossent kaninkød, importør, distributør, Danmark, kvalitets kød, Heintz Nordic Frezzen",
  authors: [{ name: "Heintz Nordic Frezzen" }],
  creator: "Heintz Nordic Frezzen",
  publisher: "Heintz Nordic Frezzen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://heintz-nordic-frezzen.dk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Heintz Nordic Frezzen - Importør og distributør af frossent kaninkød",
    description: "Heintz Nordic Frezzen er importør og distributør af frossent kaninkød i Danmark",
    url: 'https://heintz-nordic-frezzen.dk',
    siteName: 'Heintz Nordic Frezzen',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Heintz Nordic Frezzen Logo',
      },
    ],
    locale: 'da_DK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Heintz Nordic Frezzen - Importør og distributør af frossent kaninkød",
    description: "Heintz Nordic Frezzen er importør og distributør af frossent kaninkød i Danmark",
    images: ['/logo.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
