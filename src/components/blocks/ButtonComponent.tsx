'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';

type ButtonComponentProps = {
  sys: { id: string };
  text?: string;
  link: string;
  color?: 'blue' | 'orange' | 'yellow';
  position?: 'left' | 'center' | 'right';
};

const POSITION_MAP: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const ROOT_COLORS: Record<'blue' | 'orange' | 'yellow', { bg: string; text: string }> = {
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
}: ButtonComponentProps) {
  if (!text?.trim() || !link) return null;

  const justifyClass = POSITION_MAP[position] ?? POSITION_MAP.center;
  const styles = ROOT_COLORS[color];

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
            style={{
              backgroundColor: styles.bg,
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
