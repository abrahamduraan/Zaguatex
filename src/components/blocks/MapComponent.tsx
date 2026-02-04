'use client';

import { motion } from 'motion/react';

type MapComponentProps = {
  sys: { id: string };
  link: string; // link de Google Maps embed directo
  text?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZE_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-64 h-64',
  md: 'w-80 h-80',
  lg: 'w-96 h-96',
};

export default function MapComponent({ sys, link, text, size = 'md' }: MapComponentProps) {
  if (!link?.trim()) return null;

  const sizeClass = SIZE_MAP[size];

  return (
    <div className="my-8 flex flex-col items-center">
      {text && (
        <motion.h3
          className="text-xl font-semibold md:text-2xl mb-2 text-center"
          style={{ color: 'var(--color-yellow)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {text}
        </motion.h3>
      )}

      <motion.div
        key={sys.id}
        className={`${sizeClass} rounded-lg overflow-hidden shadow-md bg-white`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <iframe
          src={link}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        />
      </motion.div>
    </div>
  );
}
