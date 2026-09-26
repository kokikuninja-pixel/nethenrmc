import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MotorLanding } from '@/components/motor-landing';
import { FloatingActionButton } from '@/components/floating-action-button';
import { PromoPopup } from '@/components/promo-popup';
import { JsonLd } from '@/components/json-ld';
import { buildFaqPageJsonLd, buildLocalBusinessJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSeoMetadata(
  'Sewa Motor Bandung',
  'Sewa Motor Bandung | Rental Motor Terbaik Nethen',
  'Sewa motor di Bandung dengan harga mulai Rp 60.000/hari. Tersedia Vario, Aerox, Beat, Mio, Scoopy & Fino. Semua unit lepas kunci + helm & jas hujan gratis. Pesan sekarang!',
  '/'
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <JsonLd data={buildLocalBusinessJsonLd()} />
      <JsonLd data={buildFaqPageJsonLd()} />
      <Header />
      <main>
        <MotorLanding />
      </main>
      <Footer />
      <FloatingActionButton />
      <PromoPopup />
    </div>
  );
}