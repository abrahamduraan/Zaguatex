'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/marketing/header-navigation/header';
import type { NavItem, NavLogo } from '@/lib/contentful';

interface MainNavEditProps {
  items: NavItem[];
  logo?: NavLogo;
}

export default function MainNavEdit({ items, logo }: MainNavEditProps) {
  if (!items?.length && !logo) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Convertimos items al formato que Header espera
  const headerItems = items.map(item => ({
    label: item.text,
    href: item.link,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white"
    >
      <Header
        items={headerItems}
        logoUrl={logo?.url ?? ''}
        logoAlt={logo?.title ?? ''}
        renderLogo={() => (
          <Link href="/">
            <img
              src={logo?.url}
              alt={logo?.title}
              className="h-8 cursor-pointer"
            />
          </Link>
        )}
      />
    </motion.div>
  );
}
