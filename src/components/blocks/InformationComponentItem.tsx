'use client';

import { motion } from 'motion/react';
import { cx } from '@/utils/cx';
import type { MediaItem } from './InformationComponent';

export interface InformationItem {
  title?: string;
  text?: string;
  media?: MediaItem | null;
  mediaPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface Props {
  item: InformationItem;
  index: number;
}

export default function InformationComponentItem({ item, index }: Props) {
  const position = item.mediaPosition || 'top';
  const isHorizontal = position === 'left' || position === 'right';
  const isBottom = position === 'bottom';

  const isVideo = item.media?.url?.match(/\.(mp4|webm|ogg)$/i);

  // LAYOUT PRINCIPAL:
  // Mobile: siempre flex-col, centrado
  // Desktop: si left/right, flex-row o row-reverse
  const layoutClass = cx(
    'flex flex-col gap-6 items-center text-center', // móvil
    isHorizontal
      ? position === 'right'
        ? 'md:flex-row-reverse md:items-center md:gap-10'
        : 'md:flex-row md:items-center md:gap-10'
      : ''
  );

  // CONTENIDO
  // Mobile: centrado, ancho completo
  // Desktop: si horizontal, contenido a la izquierda o derecha, media a la otra mitad
  const contentClass = cx(
    'flex flex-col gap-4 items-center text-center w-full', // móvil
    isHorizontal ? 'md:items-start md:text-left md:w-1/2' : 'max-w-2xl'
  );

  // MEDIA
  const mediaClass = cx(
    'w-full rounded-xl',
    isHorizontal ? 'md:w-1/2' : 'max-w-3xl'
  );

  const Media = item.media?.url && (
    isVideo ? (
      <motion.video
        src={item.media.url}
        controls
        playsInline
        className={mediaClass}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      />
    ) : (
      <motion.img
        src={item.media.url}
        alt={item.media.description || ''}
        className={cx(mediaClass, 'object-cover')}
        loading="lazy"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      />
    )
  );

  const Content = (
    <motion.div
      className={contentClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {item.title && (
        <h3
          className="text-xl font-semibold md:text-2xl"
          style={{ color: 'var(--color-yellow)' }}
        >
          {item.title}
        </h3>
      )}

      {item.text && (
        <p
          className="text-base leading-relaxed md:text-lg whitespace-pre-line"
          style={{ color: 'var(--color-gray)' }}
        >
          {item.text}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className={layoutClass}>
      {/* TOP / LEFT */}
      {!isBottom && Media}

      {Content}

      {/* BOTTOM */}
      {isBottom && Media}
    </div>
  );
}
