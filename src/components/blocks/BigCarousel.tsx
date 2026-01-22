'use client';

import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

interface BigCarouselProps {
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
      transition duration-100 ease-linear
      hover:bg-brand-solid_hover
      md:size-14
      `,
      className
    )}
  >
    {props.children ??
      (isReactComponent(Icon) ? (
        <Icon className="size-5 transition-inherit-all md:size-6" />
      ) : null)}
  </Button>
);

export const BigCarousel = ({ images }: BigCarouselProps) => {
  if (!images?.length) return null;

  return (
    <div className="mx-auto max-w-container py-12 md:py-16 overflow-x-hidden">
      <Carousel.Root opts={{ align: "start" }}>
        <Carousel.Content
          overflowHidden
          className="gap-6 pr-4 md:pr-8 lg:gap-8"
        >
          {images.map((img, index) => (
            <Carousel.Item key={`${img.url}-${index}`} className="basis-auto">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={img.url}
                  alt={img.title || ""}
                  className="max-h-90 max-w-90 cursor-grab object-contain lg:max-h-180 lg:max-w-180"
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <div className="mt-8 flex gap-4 md:gap-8">
          <Carousel.PrevTrigger asChild>
            <RoundButton icon={ArrowLeft} />
          </Carousel.PrevTrigger>

          <Carousel.NextTrigger asChild>
            <RoundButton icon={ArrowRight} />
          </Carousel.NextTrigger>
        </div>
      </Carousel.Root>
    </div>
  );
};

export default BigCarousel;
