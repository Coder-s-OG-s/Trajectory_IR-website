import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata = {
  metadataBase: new URL('https://trajectory-ir.dev'),
  title: 'Trajectory IR Documentation',
  description: 'The ultimate durable semantic layer for autonomous AI agents.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Trajectory IR Documentation',
    description: 'The ultimate durable semantic layer for autonomous AI agents.',
    siteName: 'Trajectory IR',
    images: [{ url: '/logo.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary' as const,
    title: 'Trajectory IR Documentation',
    description: 'The ultimate durable semantic layer for autonomous AI agents.',
    images: ['/logo.png'],
  },
};

import { UnderConstructionModal } from '@/components/under-construction-modal';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'dark', enableSystem: false }}>{children}</RootProvider>
        <UnderConstructionModal />
      </body>
    </html>
  );
}
