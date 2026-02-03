'use client';

import { motion } from 'motion/react';
import { Carousel } from '@/components/application/carousel/carousel-base';
import { Button } from '@/components/base/buttons/button';
import { ArrowLeft, ArrowRight } from '@untitledui/icons';
import { cx } from '@/utils/cx';
import { isReactComponent } from '@/utils/is-react-component';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type CarouselSize = 'small' | 'medium' | 'large';

interface BigCarouselProps {
  title?: string;
  subtitle?: string;
  images: { url: string; title?: string }[];
  size?: CarouselSize;
}

/* -------------------------------------------------------------------------- */
/* Size config                                                                 */
/* -------------------------------------------------------------------------- */

const SIZE_STYLES: Record<
  CarouselSize,
  {
    container: string;
    gap: string;
    image: string;
    button: string;
  }
> = {
  small: {
    container: 'py-8',
    gap: 'gap-4',
    image: 'max-h-48 max-w-48 lg:max-h-64 lg:max-w-64',
    button: 'size-10 md:size-12',
  },
  medium: {
    container: 'py-10',
    gap: 'gap-5',
    image: 'max-h-64 max-w-64 lg:max-h-96 lg:max-w-96',
    button: 'size-11 md:size-13',
  },
  large: {
    container: 'py-12 md:py-16',
    gap: 'gap-6 lg:gap-8',
    image: 'max-h-90 max-w-90 lg:max-h-180 lg:max-w-180',
    button: 'size-12 md:size-14',
  },
};

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

const RoundButton = ({
  icon: Icon,
  sizeClass,
  className,
  ...props
}: any) => (
  <Button
    {...props}
    className={cx(
      `
      group flex items-center justify-center rounded-full
      bg-brand-solid text-white shadow-xs-skeumorphic
      ring-1 ring-transparent ring-inset
      transition duration-150 ease-out
      hover:scale-105 hover:bg-brand-solid_hover
      `,
      sizeClass,
      className
    )}
  >
    {isReactComponent(Icon) && (
      <Icon className="size-5 md:size-6 transition-inherit-all" />
    )}
  </Button>
);

/* -------------------------------------------------------------------------- */
/* BigCarousel                                                                 */
/* -------------------------------------------------------------------------- */

export const BigCarousel = ({
  title,
  subtitle,
  images,
  size = 'large',
}: BigCarouselProps) => {
  if (!images?.length) return null;

  const styles = SIZE_STYLES[size];
  const initialDelay = 0.3;

  return (
    <div
      className={cx(
        'mx-auto max-w-container overflow-x-hidden',
        styles.container
      )}
    >
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-brand-secondary text-lg font-semibold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title */}
      {title && (
        <motion.h2
          className="text-brand-primary text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}

      <Carousel.Root opts={{ align: 'start' }}>
        <Carousel.Content
          overflowHidden
          className={cx(styles.gap, 'pr-4 md:pr-8')}
        >
          {images.map((img, index) => (
            <Carousel.Item
              key={`${img.url}-${index}`}
              className="basis-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  ease: 'easeOut',
                  delay: initialDelay,
                }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src={img.url}
                  alt={img.title || ''}
                  className={cx(
                    'cursor-grab object-contain',
                    styles.image
                  )}
                />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Controls */}
        <div className="mt-8 flex gap-4 md:gap-8 pl-4">
          <Carousel.PrevTrigger asChild>
            <RoundButton
              icon={ArrowLeft}
              sizeClass={styles.button}
            />
          </Carousel.PrevTrigger>

          <Carousel.NextTrigger asChild>
            <RoundButton
              icon={ArrowRight}
              sizeClass={styles.button}
            />
          </Carousel.NextTrigger>
        </div>
      </Carousel.Root>
    </div>
  );
};

export default BigCarousel;
