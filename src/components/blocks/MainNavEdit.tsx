'use client';

import { motion } from 'framer-motion';
import { Header } from "@/components/marketing/header-navigation/header";
import Link from 'next/link';

interface MainNavEditProps {
  items: { text: string; link: string }[];
  logo: { url: string; title: string };
}

export default function MainNavEdit({ items, logo }: MainNavEditProps) {
  const headerItems = items.map(item => ({
    label: item.text,
    href: item.link
  }));

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white"
    >
      <Header
        items={headerItems}
        logoUrl={logo.url}
        logoAlt={logo.title}
        renderLogo={() => (
          <Link href="/">
            <img src={logo.url} alt={logo.title} className="h-8 cursor-pointer" />
          </Link>
        )}
        renderItem={(item) => (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-4 py-2 text-sm md:text-base font-medium"
          >
            <Link href={`/${item.href}`}>{item.label}</Link>
          </motion.div>
        )}
      />
    </motion.div>
  );
}
