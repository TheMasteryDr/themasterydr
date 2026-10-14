import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://themasterydr.com'),
  title: {
    default: 'The Mastery Dr — Moses Oladoye | Growth Strategist & Head Growth Coach',
    template: '%s | The Mastery Dr',
  },
  description: 'The official digital ecosystem of The Mastery Dr (Moses Oladoye). Growth strategist, purpose coach, and educator helping people move from ignorance and stagnation toward clarity, consistent growth, and purposeful impact.',
  keywords: [
    'The Mastery Dr',
    'Moses Oladoye',
    'Gain Mastery Institute',
    'Growth Strategist',
    'Purpose Coach',
    'Six Dimensions of Mastery',
    'The Bereans Reading Community',
    'Personal Development Nigeria',
    'Leadership Speaker Africa',
    'Financial Intelligence',
  ],
  authors: [{ name: 'Moses Oladoye', url: 'https://themasterydr.com' }],
  creator: 'Moses Oladoye',
  publisher: 'Gain Mastery Institute',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'The Mastery Dr — Moses Oladoye | Gain Mastery Institute',
    description: 'A framework for intentional growth: purpose, personal development, financial intelligence, leadership, spiritual growth, and strategy.',
    url: 'https://themasterydr.com',
    siteName: 'The Mastery Dr',
    images: [
      {
        url: '/images/founder/founder_photo_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Moses Oladoye — The Mastery Dr',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mastery Dr — Moses Oladoye',
    description: 'Helping people find clarity, discover purpose, and grow into who they were designed to become.',
    images: ['/images/founder/founder_photo_1.jpg'],
    creator: '@themasterydr',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Moses Oladoye',
    alternateName: 'The Mastery Dr',
    url: 'https://themasterydr.com',
    image: 'https://themasterydr.com/images/founder/founder_photo_1.jpg',
    jobTitle: 'Head Growth Coach',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Gain Mastery Institute',
    },
    sameAs: [
      'https://instagram.com/themasterydr',
      'https://tiktok.com/@themasterydr',
      'https://facebook.com/themasterydr',
      'https://t.me/masterymasterminds',
    ],
    description: 'Growth strategist, purpose coach, and educator helping people move from ignorance and stagnation toward clarity, consistent growth, and purposeful impact.',
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#07090E" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '68px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
