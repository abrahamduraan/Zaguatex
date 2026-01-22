'use client';

import { motion } from 'motion/react';
import { cx } from '@/utils/cx';

interface MediaItem {
  url: string;
  title?: string;
  description?: string;
}

interface InformationItem {
  title?: string;
  text?: string;
  media?: MediaItem;
  mediaPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface InformationComponentProps {
  heading?: string;
  introText?: string;
  image?: {
    url: string;
    title?: string;
    description?: string;
  };
  items: InformationItem[];
}

export default function InformationComponent({
  heading,
  introText,
  image,
  items,
}: InformationComponentProps) {
  if (!items?.length) return null;

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">

        {/* Imagen principal */}
        {image?.url && (
          <div className="mb-20">
            <img
              src={image.url}
              alt={image.description || ''}
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Heading */}
        {heading && (
          <h2 className="mx-auto mb-6 max-w-4xl text-center text-3xl font-bold text-brand-primary md:text-4xl">
            {heading}
          </h2>
        )}

        {/* Intro */}
        {introText && (
          <p className="mx-auto mb-16 max-w-4xl text-center text-base leading-relaxed text-tertiary md:text-lg whitespace-pre-line">
            {introText}
          </p>
        )}

        {/* Items */}
        <div className="mx-auto flex max-w-4xl flex-col gap-14">
          {items.map((item, index) => {
            const position = item.mediaPosition || 'top';
            const isHorizontal = position === 'left' || position === 'right';

            const isVideo = item.media?.url?.match(/\.(mp4|webm|ogg)$/i);

            const mediaClass = cx(
              'w-full rounded-xl',
              isHorizontal ? 'md:w-1/2' : 'max-w-3xl'
            );

            const media =
              item.media?.url &&
              (isVideo ? (
                <video
                  src={item.media.url}
                  controls
                  playsInline
                  className={mediaClass}
                />
              ) : (
                <img
                  src={item.media.url}
                  alt={item.media.description || ''}
                  className={cx(mediaClass, 'object-cover')}
                  loading="lazy"
                />
              ));

            const content = (
              <div className={cx(
                'flex flex-col gap-4',
                !isHorizontal && 'items-center text-center max-w-2xl'
              )}>
                {item.title && (
                  <h3 className="text-xl font-semibold text-brand-secondary md:text-2xl">
                    {item.title}
                  </h3>
                )}
                {item.text && (
                  <p className="text-base leading-relaxed text-tertiary md:text-lg whitespace-pre-line">
                    {item.text}
                  </p>
                )}
              </div>
            );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cx(
                  'flex gap-6',
                  isHorizontal
                    ? 'flex-col md:flex-row md:items-center md:gap-10'
                    : 'flex-col items-center text-center'
                )}
              >
                {position === 'top' && (
                  <>
                    {media}
                    {content}
                  </>
                )}

                {position === 'bottom' && (
                  <>
                    {content}
                    {media}
                  </>
                )}

                {position === 'left' && (
                  <>
                    {media}
                    {content}
                  </>
                )}

                {position === 'right' && (
                  <>
                    {content}
                    {media}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
