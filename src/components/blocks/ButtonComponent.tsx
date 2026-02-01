'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';

type ButtonComponentProps = {
  sys: { id: string };
  text?: string;
  link?: string;
  position?: string;
};

const POSITION_MAP: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export default function ButtonComponent({
  sys,
  text,
  link,
  position = 'center',
}: ButtonComponentProps) {
  if (!text?.trim() || !link) return null;

  return (
    // wrapper full width
    <div className="w-full my-8">
      {/* contenedor limitado con padding */}
      <motion.div
        key={sys.id}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex ${POSITION_MAP[position]}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* 🔥 Usamos Button base TAL CUAL */}
          <Button
            size="xl"
            href={link}
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
