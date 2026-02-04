'use client';

import { motion } from 'motion/react';
import { Carousel } from '@/components/application/carousel/carousel-base';
import { Button } from '@/components/base/buttons/button';
import { ArrowLeft, ArrowRight } from '@untitledui/icons';
import { cx } from '@/utils/cx';
import { isReactComponent } from '@/utils/is-react-component';

type CarouselSize = 'small' | 'medium' | 'large';

interface BigCarouselProps {
  title?: string;
  subtitle?: string;
  images: { url: string; title?: string }[];
  size?: CarouselSize;
}

const SIZE_STYLES: Record<
  CarouselSize,
  {
    container: string;
    gap: string;
    itemBasis: string;
    image: string;
    button: string;
    controlsGap: string;
    controlsPadding: string;
  }
> = {
  small: {
    container: 'py-8',
    gap: 'gap-4',
    itemBasis: 'basis-[70%] sm:basis-[45%] md:basis-[30%]',
    image: 'w-full h-auto rounded-2xl',
    button: 'size-8 md:size-10',
    controlsGap: 'gap-3 md:gap-4',
    controlsPadding: 'pl-2 md:pl-4',
  },
  medium: {
    container: 'py-10',
    gap: 'gap-5',
    itemBasis: 'basis-[75%] sm:basis-[50%] md:basis-[33%]',
    image: 'w-full h-auto rounded-2xl',
    button: 'size-9 md:size-11',
    controlsGap: 'gap-4 md:gap-6',
    controlsPadding: 'pl-2 md:pl-6',
  },
  large: {
    container: 'py-12 md:py-16',
    gap: 'gap-6 lg:gap-8',
    itemBasis: 'basis-[85%] sm:basis-[50%] md:basis-[40%] lg:basis-[35%]',
    image: 'w-full h-auto rounded-2xl',
    button: 'size-13 md:size-15',
    controlsGap: 'gap-6 md:gap-8',
    controlsPadding: 'pl-4 md:pl-8',
  },
};

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
          className={cx(styles.gap, 'pr-6 md:pr-12')}
        >
          {images.map((img, index) => (
            <Carousel.Item
              key={`${img.url}-${index}`}
              className={cx(styles.itemBasis, 'flex-shrink-0')}
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
                  className={styles.image}
                />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Controls */}
        <div
          className={cx(
            'mt-8 flex justify-center md:justify-start',
            styles.controlsGap,
            styles.controlsPadding
          )}
        >
          <Carousel.PrevTrigger asChild>
            <RoundButton icon={ArrowLeft} sizeClass={styles.button} />
          </Carousel.PrevTrigger>

          <Carousel.NextTrigger asChild>
            <RoundButton icon={ArrowRight} sizeClass={styles.button} />
          </Carousel.NextTrigger>
        </div>
      </Carousel.Root>
    </div>
  );
};

export default BigCarousel;
