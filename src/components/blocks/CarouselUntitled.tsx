'use client';

import { ChevronLeft, ChevronRight } from '@untitledui/icons';
import { Carousel } from '@/components/application/carousel/carousel-base';

type CarouselUntitledProps = {
  images?: {
    url: string;
    title: string;
    description?: string | null;
  }[];
};

const CarouselUntitled = ({ images = [] }: CarouselUntitledProps) => {
  return (
    <div className="flex justify-center w-full py-16 md:py-24">
      <Carousel.Root className="relative aspect-[1.6] w-full max-w-160 mx-auto rounded-xl overflow-hidden">
        {/* Prev */}
        <Carousel.PrevTrigger className="absolute top-1/2 left-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled bg-brand-solid">
          <ChevronLeft className="size-5 text-white" />
        </Carousel.PrevTrigger>

        {/* Next */}
        <Carousel.NextTrigger className="absolute top-1/2 right-4 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-alpha-white/90 p-2 text-fg-secondary outline-focus-ring backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-disabled_subtle disabled:text-fg-disabled bg-brand-solid">
          <ChevronRight className="size-5 text-white" />
        </Carousel.NextTrigger>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <Carousel.Indicator key={index} index={index} className="bg-brand-solid" />
          ))}
        </div>

        {/* Slides */}
        <Carousel.Content className="w-full h-full">
          {images.map((img, i) => (
            <Carousel.Item key={i} className="w-full h-full">
              <img
                src={img.url}
                alt={img.title || ''}
                className="w-full h-full object-cover rounded-xl"
              />
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </div>
  );
};

export default CarouselUntitled;
