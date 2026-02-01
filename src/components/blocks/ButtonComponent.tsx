'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';

type ButtonComponentProps = {
  sys: { id: string };
  text?: string;
  link?: string;
  color?: 'blue' | 'orange' | 'yellow';
  position?: 'left' | 'center' | 'right';
};

const POSITION_MAP: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

// Mapeo de colores a Button color o style
const COLOR_MAP: Record<'blue' | 'orange' | 'yellow', { background: string; text: string }> = {
  blue: { background: 'rgb(7, 78, 140)', text: '#ffffff' },      // azul
  orange: { background: 'rgb(243, 112, 33)', text: '#ffffff' },  // naranja
  yellow: { background: 'rgb(242, 183, 5)', text: '#000000' },   // amarillo
};

export default function ButtonComponent({
  sys,
  text,
  link,
  color = 'blue',
  position = 'center',
}: ButtonComponentProps) {
  if (!text?.trim() || !link) return null;

  const justifyClass = POSITION_MAP[position] ?? POSITION_MAP.center;
  const styles = COLOR_MAP[color] ?? COLOR_MAP.blue;

  return (
    // wrapper full width
    <div className="w-full my-8">
      {/* contenedor limitado con padding como DogInfo */}
      <motion.div
        key={sys.id}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex ${justifyClass}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {/* 🔥 botón base, pero con colores dinámicos */}
          <Button
            size="xl"
            style={{
              backgroundColor: styles.background,
              color: styles.text,
            }}
            href={link}
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
