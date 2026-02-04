'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Carousel } from '@/components/application/carousel/carousel-base';
import { Button } from '@/components/base/buttons/button';
import { ArrowLeft, ArrowRight } from '@untitledui/icons';
import DogsAdoptionCard from './DogsAdoptionCard';
import { cx } from '@/utils/cx';

interface Dog {
  sys: { id: string };
  title: string;
  description?: string;
  mainImage?: { url: string; title?: string; description?: string };
  slug: string; // usar slug en lugar de title para URLs
}

interface DogsAdoptionCarouselProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  dogs: Dog[];
}

interface RoundButtonProps extends React.ComponentProps<typeof Button> {
  icon: React.ElementType;
  className?: string;
}

const RoundButton = ({ icon: Icon, className, ...props }: RoundButtonProps) => (
  <Button
    {...props}
    className={cx(
      `
      group flex size-11 md:size-12 items-center justify-center rounded-full
      bg-brand-solid text-white shadow-xs-skeumorphic
      ring-1 ring-transparent ring-inset
      px-2
      transition duration-150 ease-out
      hover:scale-105 hover:bg-brand-solid_hover
      `,
      className
    )}
  >
    <Icon className="size-5 md:size-6" />
  </Button>
);

export default function DogsAdoptionCarousel({
  title,
  subtitle,
  ctaText = 'Ver todos los perritos',
  ctaUrl = '/adoptar',
  dogs,
}: DogsAdoptionCarouselProps) {
  const router = useRouter();

  if (!dogs?.length) return null;

  const visibleDogs = dogs.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 overflow-x-hidden text-center">
      {subtitle && (
        <motion.p
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--color-yellow)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}

      {title && (
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: 'var(--color-blue)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
      )}

      <Carousel.Root opts={{ align: 'start' }}>
        <Carousel.Content overflowHidden className="gap-4 pr-4 md:gap-6">
          {visibleDogs.map((dog) => (
            <Carousel.Item
              key={dog.sys.id}
              className="basis-[85%] sm:basis-[45%] lg:basis-[30%] flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="cursor-pointer"
              >
                <DogsAdoptionCard
                  title={dog.title || 'Sin título'}
                  description={dog.description || ''}
                  mainImage={dog.mainImage}
                  onClick={() =>
                    router.push(
                      `/adoptar/${encodeURIComponent(dog.slug)}`
                    )
                  }
                />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Triggers y CTA */}
        <div className="mt-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
          {/* Mobile */}
          <div className="flex md:hidden items-center justify-between w-full px-4">
            <Carousel.PrevTrigger asChild>
              <RoundButton icon={ArrowLeft} aria-label="Anterior" />
            </Carousel.PrevTrigger>

            <Button href={ctaUrl} color="orange" size="lg" className="flex-1 mx-2">
              {ctaText}
            </Button>

            <Carousel.NextTrigger asChild>
              <RoundButton icon={ArrowRight} aria-label="Siguiente" />
            </Carousel.NextTrigger>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between w-full px-4">
            <div className="flex gap-4">
              <Carousel.PrevTrigger asChild>
                <RoundButton icon={ArrowLeft} aria-label="Anterior" />
              </Carousel.PrevTrigger>

              <Carousel.NextTrigger asChild>
                <RoundButton icon={ArrowRight} aria-label="Siguiente" />
              </Carousel.NextTrigger>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button href={ctaUrl} color="orange" size="lg">
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </Carousel.Root>
    </div>
  );
}
