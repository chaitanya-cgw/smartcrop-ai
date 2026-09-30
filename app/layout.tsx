import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';
import BhoomiAI from '@/components/BhoomiAI';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartCrop AI - Multi-Season Agricultural Engine',
  description: 'AI-powered crop optimization, rotation scheduling, and rural innovation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <BhoomiAI />
        </I18nProvider>
      </body>
    </html>
  );
}