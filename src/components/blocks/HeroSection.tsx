'use client';

import { ArrowRight, PlayCircle } from '@untitledui/icons';
import { BadgeGroup } from '@/components/base/badges/badge-groups';
import { Button } from '@/components/base/buttons/button';

type HeroProps = {
  title: string;
  badge?: string | null;
  heading?: string | null;
  supportingText?: string | null;
  buttonOneText?: string | null;
  buttonOneUrl?: string | null;
  buttonTwoText?: string | null;
  buttonTwoUrl?: string | null;
  image: {
    url: string;
    title: string;
    description?: string | null;
  };
};

const HeroSection = ({
  title,
  badge,
  heading,
  supportingText,
  buttonOneText,
  buttonOneUrl,
  buttonTwoText,
  buttonTwoUrl,
  image,
}: HeroProps) => {
  return (
    <div className="bg-primary">
      <section
        style={{
          backgroundImage: `url(${image.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="flex items-center h-screen"
      >
        <div className="flex flex-col items-center pt-16 pb-16 md:pt-24 md:pb-24 w-full">
          <div className="mx-auto flex w-full max-w-container flex-col px-4 md:px-8">
            <div className="flex flex-col items-start sm:items-center sm:text-center">
              {badge && (
                <a
                  href="#"
                  className="rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <BadgeGroup
                    className="hidden md:flex"
                    size="lg"
                    addonText="New feature"
                    iconTrailing={ArrowRight}
                    theme="light"
                    color="brand"
                  >
                    {badge}
                  </BadgeGroup>
                  <BadgeGroup
                    className="md:hidden"
                    size="md"
                    addonText="New feature"
                    iconTrailing={ArrowRight}
                    theme="light"
                    color="brand"
                  >
                    {badge}
                  </BadgeGroup>
                </a>
              )}

              {heading && (
                <h1 className="mt-4 text-display-md font-semibold text-brand-primary md:text-display-lg lg:text-display-xl">
                  {heading}
                </h1>
              )}
              {supportingText && (
                <p className="mt-4 max-w-3xl text-lg text-brand-secondary md:mt-6 md:text-xl">
                  {supportingText}
                </p>
              )}
              <div className="relative z-1 mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                {buttonOneText && (
                  <Button iconLeading={PlayCircle} color="secondary" size="xl" href={buttonOneUrl}>
                    {buttonOneText}
                  </Button>
                )}
                {buttonTwoText && (
                  <Button size="xl" href={buttonTwoUrl}>
                    {buttonTwoText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
