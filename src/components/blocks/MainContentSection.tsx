'use client';

import { ChartBreakoutSquare, MessageChatCircle, ZapFast } from '@untitledui/icons';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';

type MainContentSectionProps = {
  heading: string;
  subHeading?: string | null;
  supportingText?: string | null;

  cardTitle1: string;
  cardText1: string;
  cardTitle2: string;
  cardText2: string;
  cardTitle3: string;
  cardText3: string;

  image1: {
    url: string;
    title: string;
    description?: string | null;
  };
  image2: {
    url: string;
    title: string;
    description?: string | null;
  };
  image3: {
    url: string;
    title: string;
    description?: string | null;
  };
};

const MainContentSection = ({
  heading,
  subHeading,
  supportingText,

  cardTitle1,
  cardText1,
  cardTitle2,
  cardText2,
  cardTitle3,
  cardText3,

  image1,
  image2,
  image3,
}: MainContentSectionProps) => {
  return (
    <section className="flex flex-col gap-12 bg-primary py-16 sm:gap-16 md:gap-20 md:py-24 lg:gap-24 bg-secondary_alt">
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {subHeading && (
            <span className="text-sm font-semibold text-brand-secondary md:text-md">
              {subHeading}
            </span>
          )}

          {heading && (
            <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
              {heading}
            </h2>
          )}

          {supportingText && (
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{supportingText}</p>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-container flex-col gap-12 px-4 sm:gap-16 md:gap-20 md:px-8 lg:gap-24 lg:px-0">
        {/* CARD 1 */}
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-0">
          <div className="flex-1 self-center lg:py-24 lg:pr-24 lg:pl-12">
            {cardTitle1 && (
              <h2 className="mt-5 text-display-xs font-semibold text-primary md:text-display-sm">
                {cardTitle1}
              </h2>
            )}
            {cardText1 && (
              <p className="mt-2 text-md text-tertiary md:mt-4 md:text-lg">{cardText1}</p>
            )}
          </div>

          {image1 && (
            <div className="relative w-full aspect-square flex-1">
              <img
                src={image1.url}
                alt={image1.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* CARD 2 */}
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-0">
          <div className="flex-1 self-center lg:order-last lg:py-24 lg:pr-8 lg:pl-24">
            {cardTitle2 && (
              <h2 className="mt-5 text-display-xs font-semibold text-primary md:text-display-sm">
                {cardTitle2}
              </h2>
            )}
            {cardText2 && (
              <p className="mt-2 text-md text-tertiary md:mt-4 md:text-lg">{cardText2}</p>
            )}
          </div>

          {image2 && (
            <div className="relative w-full aspect-square flex-1">
              <img
                src={image2.url}
                alt={image2.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* CARD 3 */}
        <div className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-0">
          <div className="flex-1 self-center lg:py-24 lg:pr-24 lg:pl-12">
            {cardTitle3 && (
              <h2 className="mt-5 text-display-xs font-semibold text-primary md:text-display-sm">
                {cardTitle3}
              </h2>
            )}
            {cardText3 && (
              <p className="mt-2 text-md text-tertiary md:mt-4 md:text-lg">{cardText3}</p>
            )}
          </div>

          {image3 && (
            <div className="relative w-full aspect-square flex-1">
              <img
                src={image3.url}
                alt={image3.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
