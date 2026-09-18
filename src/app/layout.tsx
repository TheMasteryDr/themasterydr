import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://themasterydr.com'),
  title: {
    default: 'The Mastery Dr — Moses Oladoye | Growth Strategist & Educator',
    template: '%s | The Mastery Dr',
  },
  description: 'The personal brand and digital learning ecosystem of Moses Oladoye — Head Growth Coach at Gain Mastery Institute, helping individuals and leaders cultivate intentional growth, purpose, and impact.',
  keywords: [
    'The Mastery Dr',
    'Moses Oladoye',
    'Gain Mastery Institute',
    'The Bereans',
    'Growth Strategist',
    'Personal Development Nigeria',
    'Purpose Coach',
    'Financial Intelligence',
    'Christian Growth Platform',
  ],
  authors: [{ name: 'Moses Oladoye', url: 'https://themasterydr.com' }],
  creator: 'The Mastery Dr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://themasterydr.com',
    title: 'The Mastery Dr — Moses Oladoye | Growth Strategist & Educator',
    description: 'A comprehensive framework for intentional growth: Purpose, Personal Growth, Financial Intelligence, Leadership, Spiritual Depth, and Strategy.',
    siteName: 'The Mastery Dr',
    images: [
      {
        url: '/images/1_moses_oladoye_the_mastery_dr_e.jpg',
        width: 1200,
        height: 630,
        alt: 'Moses Oladoye — The Mastery Dr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mastery Dr — Moses Oladoye',
    description: 'Helping people find clarity, discover purpose, and grow into who they were designed to become.',
    images: ['/images/1_moses_oladoye_the_mastery_dr_e.jpg'],
    creator: '@themasterydr',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ paddingTop: '73px', minHeight: '80vh' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
