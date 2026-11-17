import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { SystemProvider } from '@/lib/motionPrefs';
import { LenisProvider } from '@/lib/lenis';
import { RioChatModal } from '@/components/chat/RioChatModal';
import { SystemTerminal } from '@/components/chat/SystemTerminal';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-jp',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#05050a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bala-portfolio-two.vercel.app'),
  title: {
    default: 'BALA MUGESH M K | Forward Deployed AI Engineer — R.I.O. System',
    template: '%s | BALA MUGESH M K — R.I.O. System',
  },
  description:
    'Interactive R.I.O. autonomous agent runtime & System Window portfolio of Bala Mugesh M K — Forward Deployed AI Engineer specializing in LLM agent architectures, edge computer vision, and production AI backends.',
  authors: [{ name: 'Bala Mugesh M K' }],
  icons: {
    icon: [
      { url: '/bm-logo.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/bm-logo.png',
  },
  openGraph: {
    title: 'BALA MUGESH M K | Forward Deployed AI Engineer — R.I.O. System',
    description:
      'Enter the R.I.O. System Window: autonomous AI agent runtimes, edge visual inspection, decision engines, and forward-deployed production engineering by Bala Mugesh M K.',
    url: 'https://bala-portfolio-two.vercel.app',
    siteName: 'BALA MUGESH M K // R.I.O. System',
    type: 'website',
    images: [
      {
        url: '/bm-logo.png',
        width: 512,
        height: 512,
        alt: 'Bala Mugesh M K — R.I.O. System Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@balamugesh',
    title: 'BALA MUGESH M K | Forward Deployed AI Engineer — R.I.O. System',
    description:
      'Autonomous AI agents, edge computer vision, and production systems presented as the R.I.O. System Window.',
    images: ['/bm-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansJp.variable}`}
    >
      <body className="bg-bg text-ink antialiased selection:bg-cyan-sys selection:text-bg">
        <a href="#main-content" className="skip-link">
          SKIP TO CONTENT
        </a>
        <SystemProvider>
          <LenisProvider>
            {children}
            <RioChatModal />
            <SystemTerminal />
          </LenisProvider>
        </SystemProvider>
      </body>
    </html>
  );
}
