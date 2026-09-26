import type {Metadata} from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from '@next/third-parties/google';
import { cn } from '@/lib/utils';
import { getBrand, getGtmId, getSiteUrl } from '@/brands';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessJsonLd, buildWebsiteJsonLd } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const brand = getBrand();
const siteUrl = getSiteUrl();

const defaultTitle = `${brand.shortName} - Rental Motor ${brand.city} | Sewa Motor Cepat & Aman`;

// Build theme style from brand config
const themeStyle = {
  '--background': brand.theme.background,
  '--foreground': brand.theme.foreground,
  '--primary': brand.theme.primary,
  '--primary-foreground': brand.theme.primaryForeground,
  '--muted': brand.theme.muted,
  '--muted-foreground': brand.theme.mutedForeground,
  '--border': brand.theme.border,
  '--ring': brand.theme.ring,
  '--radius': brand.theme.radius,
  '--font-sans': brand.theme.fontSans,
  '--font-display': brand.theme.fontDisplay,
  '--theme-color': `hsl(${brand.theme.primary})`,
} as React.CSSProperties;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: `hsl(${brand.theme.primary})`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: brand.description,
  applicationName: brand.legalName,
  keywords: [
    `sewa motor ${brand.city}`,
    `rental motor ${brand.city}`,
    'sewa motor semarang',
    'rental motor murah semarang',
    brand.shortName,
  ],
  authors: [{ name: brand.legalName }],
  creator: brand.legalName,
  publisher: brand.legalName,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: brand.legalName,
    title: defaultTitle,
    description: brand.description,
    images: [
      {
        url: brand.ogImagePath,
        width: 1200,
        height: 630,
        alt: brand.legalName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: brand.description,
    images: [brand.ogImagePath],
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = getGtmId();

  return (
    <html lang="id" className={cn('!scroll-smooth', inter.variable, plusJakarta.variable)} style={themeStyle}>
      <body className={cn('font-sans antialiased', inter.className)}>
        <JsonLd data={buildLocalBusinessJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
        {/* Ads conversions should be fired from GTM (single tag path for performance). */}
        <GoogleTagManager gtmId={gtmId} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
