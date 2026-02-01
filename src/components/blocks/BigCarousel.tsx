'use client';

import { motion } from 'motion/react';
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

interface BigCarouselProps {
  title?: string;
  subtitle?: string;
  images: { url: string; title?: string }[];
}

const RoundButton = ({ icon: Icon, className, ...props }: any) => (
  <Button
    {...props}
    className={cx(
      `
      group flex size-12 items-center justify-center rounded-full
      bg-brand-solid text-white shadow-xs-skeumorphic
      ring-1 ring-transparent ring-inset
      transition duration-150 ease-out
      hover:scale-105 hover:bg-brand-solid_hover
      md:size-14
      `,
      className
    )}
  >
    {props.children ?? (isReactComponent(Icon) ? (
      <Icon className="size-5 transition-inherit-all md:size-6" />
    ) : null)}
  </Button>
);

export const BigCarousel = ({ title, subtitle, images }: BigCarouselProps) => {
  if (!images?.length) return null;

  const initialDelay = 0.3;
  const stagger = 0; // más espacio entre cada imagen

  return (
    <div className="mx-auto max-w-container py-12 md:py-16 overflow-x-hidden">

      {/* Subtítulo */}
      {subtitle && (
        <motion.p
          className="text-brand-secondary text-lg font-semibold mb-2 text-center"
          initial={{ opacity: 0, y:  20}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Título */}
      {title && (
        <motion.h2
          className="text-brand-primary text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}

      <Carousel.Root opts={{ align: "start" }}>
        <Carousel.Content
          overflowHidden
          className="gap-6 pr-4 md:pr-8 lg:gap-8"
        >
          {images.map((img, index) => (
            <Carousel.Item key={`${img.url}-${index}`} className="basis-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: initialDelay + index * stagger,
                }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src={img.url}
                  alt={img.title || ""}
                  className="max-h-90 max-w-90 cursor-grab object-contain lg:max-h-180 lg:max-w-180"
                />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        {/* Botones */}
        <div className="mt-8 flex gap-4 md:gap-8 pl-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: initialDelay }}
            whileHover={{ scale: 1.05 }}
          >
            <Carousel.PrevTrigger asChild>
              <RoundButton icon={ArrowLeft} />
            </Carousel.PrevTrigger>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: initialDelay }}
            whileHover={{ scale: 1.05 }}
          >
            <Carousel.NextTrigger asChild>
              <RoundButton icon={ArrowRight} />
            </Carousel.NextTrigger>
          </motion.div>
        </div>
      </Carousel.Root>
    </div>
  );
};

export default BigCarousel;
