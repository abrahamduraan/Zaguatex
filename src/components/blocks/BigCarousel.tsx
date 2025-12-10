"use client";

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
    color="link-gray"
    className={cx(
      "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
      className
    )}
  >
    {props.children ?? (isReactComponent(Icon) ? (
      <Icon className="size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6" />
    ) : null)}
  </Button>
);

export const BigCarousel = ({ images }: BigCarouselProps) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mx-auto max-w-container py-12 md:py-16 overflow-x-hidden"> {/* sin scroll horizontal */}
      <Carousel.Root opts={{ align: "start" }}>
        <Carousel.Content overflowHidden={true} className="gap-6 pr-4 md:pr-8 lg:gap-8">
          {images.map((img, index) => (
            <Carousel.Item key={`${img.url}-${index}`} className="basis-auto">
              <img
                src={img.url}
                alt={img.title || ""}
                className="size-auto max-h-90 max-w-90 cursor-grab object-contain lg:max-h-180 lg:max-w-180"
              />
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
