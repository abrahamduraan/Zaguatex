'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import DogsAdoptionCard from './DogsAdoptionCard';
import { Button } from '@/components/base/buttons/button';

interface Dog {
  sys: { id: string };
  title: string;
  description: string;
  mainImage?: { url: string; title?: string; description?: string };
}

interface DogsAdoptionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  dogs: Dog[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function DogsAdoption({
  title,
  subtitle,
  buttonText,
  buttonUrl,
  dogs,
}: DogsAdoptionProps) {
  const router = useRouter();

  if (!dogs?.length) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 text-center">
      {subtitle && (
        <motion.p
          className="text-brand-secondary text-lg font-semibold mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}

      {title && (
        <motion.h2
          className="text-brand-primary text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}

      {buttonText && buttonUrl && (
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              size="xl"
              href={buttonUrl}
              color="primary"
              target="_blank"          // ← abre en nueva pestaña
              rel="noopener noreferrer" // ← por seguridad
            >
              {buttonText}
            </Button>
          </motion.div>
        </motion.div>
      )}

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dogs.map((dog) => (
          <motion.li
            key={dog.sys.id + dog.title}
            variants={cardVariants}
            whileHover={{ scale: 1.025 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="cursor-pointer"
          >
            <DogsAdoptionCard
              title={dog.title}
              description={dog.description}
              mainImage={dog.mainImage}
              onClick={() =>
                router.push(`/adoptar/${encodeURIComponent(dog.title)}`)
              }
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
