'use client';

import { motion } from 'motion/react';

interface InfoItem {
  title?: string;
  text?: string;
  image?: {
    url: string;
    title?: string;
    description?: string;
  };
}

interface InformationComponentProps {
  heading?: string;
  introText?: string;
  image?: {
    url: string;
    title?: string;
    description?: string;
  };
  items: InfoItem[];
}

export default function InformationComponent({
  heading,
  introText,
  image,
  items,
}: InformationComponentProps) {
  if (!items || !items.length) return null;

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="mx-auto max-w-container px-4 md:px-8">

        {/* Imagen principal full width */}
        {image?.url && (
          <div className="mb-12">
            <img
              src={image.url}
              alt={image.description || ''}
              className="w-full rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Heading */}
        {heading && (
          <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-6 text-center max-w-4xl mx-auto">
            {heading}
          </h2>
        )}

        {/* Intro Text */}
        {introText && (
          <p className="text-tertiary text-base md:text-lg leading-relaxed mb-12 text-center max-w-4xl mx-auto whitespace-pre-line">
            {introText}
          </p>
        )}

        {/* Items */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col gap-6"
            >
              {/* Item Image */}
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt={item.image.description || ''}
                  className="w-full rounded-xl object-cover"
                  loading="lazy"
                />
              )}

              {/* Item Title */}
              {item.title && (
                <h3 className="text-brand-secondary text-xl md:text-2xl font-semibold">
                  {item.title}
                </h3>
              )}

              {/* Item Text */}
              {item.text && (
                <p className="text-tertiary text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {item.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
