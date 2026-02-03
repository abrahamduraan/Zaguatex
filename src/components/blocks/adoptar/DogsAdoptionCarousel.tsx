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
  description: string;
  mainImage?: { url: string; title?: string; description?: string };
}

interface DogsAdoptionCarouselProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  dogs: Dog[];
}

const RoundButton = ({ icon: Icon, className, ...props }: any) => (
  <Button
    {...props}
    className={cx(
      `
      group flex size-10 items-center justify-center rounded-full
      bg-brand-solid text-white shadow-xs-skeumorphic
      ring-1 ring-transparent ring-inset
      transition duration-150 ease-out
      hover:scale-105 hover:bg-brand-solid_hover
      `,
      className
    )}
  >
    <Icon className="size-4 md:size-5" />
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

  // máximo 6 perros
  const visibleDogs = dogs.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 overflow-x-hidden text-center">
      {/* Subtítulo */}
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

      {/* Título */}
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
        <Carousel.Content
          overflowHidden
          className="gap-4 pr-4 md:gap-6"
        >
          {visibleDogs.map((dog) => (
            <Carousel.Item
              key={dog.sys.id}
              className="basis-[85%] sm:basis-[45%] lg:basis-[30%]"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="cursor-pointer"
              >
                <DogsAdoptionCard
                  title={dog.title}
                  description={dog.description}
                  mainImage={dog.mainImage}
                  onClick={() =>
                    router.push(`/adoptar/${encodeURIComponent(dog.title)}`)
                  }
                />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Controles */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-3">
            <Carousel.PrevTrigger asChild>
              <RoundButton icon={ArrowLeft} />
            </Carousel.PrevTrigger>

            <Carousel.NextTrigger asChild>
              <RoundButton icon={ArrowRight} />
            </Carousel.NextTrigger>
          </div>

          {/* CTA catálogo completo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              href={ctaUrl}
              color="orange"
              size="lg"
            >
              {ctaText}
            </Button>
          </motion.div>
        </div>
      </Carousel.Root>
    </div>
  );
}
