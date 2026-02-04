'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';

type ButtonComponentProps = {
  sys: { id: string };
  text?: string;
  link: string;
  color?: 'blue' | 'orange' | 'yellow';
  position?: 'left' | 'center' | 'right';
  open?: 'this' | 'another'; // 👈 NUEVO
};

const POSITION_MAP: Record<'left' | 'center' | 'right', string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const ROOT_COLORS = {
  blue: { bg: 'var(--color-blue)', text: 'var(--color-white)' },
  orange: { bg: 'var(--color-orange)', text: 'var(--color-white)' },
  yellow: { bg: 'var(--color-yellow)', text: 'var(--color-dark-gray)' },
};

export default function ButtonComponent({
  sys,
  text,
  link,
  color = 'blue',
  position = 'center',
  open = 'another', // 👈 default
}: ButtonComponentProps) {
  if (!text?.trim() || !link) return null;

  const justifyClass = POSITION_MAP[position];
  const styles = ROOT_COLORS[color];

  const isExternal = open === 'another';

  return (
    <div className="w-full my-8">
      <motion.div
        key={sys.id}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex ${justifyClass}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Button
            size="xl"
            href={link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{
              backgroundColor: styles.bg,
              color: styles.text,
            }}
          >
            {text}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
