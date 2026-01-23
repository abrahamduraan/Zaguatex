'use client';

import { motion } from 'motion/react';
import { Header } from "@/components/marketing/header-navigation/header";
import Link from 'next/link'; // <-- importante

interface MainNavEditProps {
  items: { text: string; link: string }[];
  logo: { url: string; title: string };
}

export default function MainNavEdit({ items, logo }: MainNavEditProps) {
  const headerItems = items.map(item => ({
    label: item.text,
    href: item.link
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Header
        items={headerItems}
        logoUrl={logo.url}
        logoAlt={logo.title}
        className="sticky fixed top-0 z-50"
        renderItem={(item) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-sm md:text-base font-medium"
          >
            <Link href={`/${item.href}`}>{item.label}</Link>
          </motion.div>
        )}
      />
    </motion.div>
  );
}
