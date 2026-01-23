import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { RouteProvider } from '@/providers/route-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { getMainNavigation } from "@/lib/contentful";
import MainNav from "@/components/blocks/MainNav";

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zaguatex',
  description: 'Sitio oficial de Zaguatex',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { logo, items } = await getMainNavigation("main-nav");

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainNav logo={logo} items={items} />
        <RouteProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RouteProvider>
      </body>
    </html>
  );
}
