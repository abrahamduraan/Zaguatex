'use client';

import { motion } from "motion/react";
import DogsAdoptionCard from "./DogsAdoptionCard";
import { Button } from "@/components/base/buttons/button";

interface Dog {
  sys: { id: string };
  title: string;
  description: string;
  image?: { url: string; title?: string; description?: string };
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function DogsAdoption({
  title,
  subtitle,
  buttonText,
  buttonUrl,
  dogs,
}: DogsAdoptionProps) {
  if (!dogs?.length) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 text-center">

      {subtitle && (
        <p className="text-brand-secondary text-lg font-semibold mb-3">{subtitle}</p>
      )}

      {title && (
        <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-8">{title}</h2>
      )}

      {buttonText && buttonUrl && (
        <div className="mb-12 flex justify-center">
          <Button size="xl" href={buttonUrl} color="primary">{buttonText}</Button>
        </div>
      )}

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dogs.map((dog) => (
          <motion.li
            key={dog.sys.id}
            variants={cardVariants}
            whileHover={{ scale: 1.025 }} // Solo escala, no se mueve
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="cursor-pointer"
          >
            <DogsAdoptionCard
              title={dog.title}
              description={dog.description}
              image={dog.image}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
