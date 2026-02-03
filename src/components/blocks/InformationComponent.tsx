'use client';

import { motion } from 'motion/react';
import InformationComponentItem, { InformationItem } from './InformationComponentItem';

/** 🔹 Exportado para que lo use InformationComponentItem */
export interface MediaItem {
  url: string;
  title?: string;
  description?: string;
}

interface InformationComponentProps {
  heading?: string;
  introText?: string;
  image?: MediaItem | null;
  items?: InformationItem[];
}

export default function InformationComponent({
  heading,
  introText,
  image,
  items = [],
}: InformationComponentProps) {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">

        {/* Imagen principal */}
        {image?.url && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={image.url}
              alt={image.description || ''}
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Heading */}
        {heading && (
          <motion.h2
            className="mx-auto mb-6 max-w-4xl text-center text-3xl font-bold md:text-4xl"
            style={{ color: 'var(--color-blue)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </motion.h2>
        )}

        {/* Intro */}
        {introText && (
          <motion.p
            className="mx-auto mb-16 max-w-4xl text-center text-base leading-relaxed md:text-lg whitespace-pre-line"
            style={{ color: 'var(--color-gray)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {introText}
          </motion.p>
        )}

        {/* Items (opcional) */}
        {items.length > 0 && (
          <div className="mx-auto flex max-w-4xl flex-col gap-14">
            {items.map((item, index) => (
              <InformationComponentItem
                key={index}
                item={item}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
