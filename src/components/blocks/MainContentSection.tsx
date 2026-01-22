'use client';

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

  image1: { url: string; title: string; description?: string | null };
  image2: { url: string; title: string; description?: string | null };
  image3: { url: string; title: string; description?: string | null };
};

const ImageBlock = ({ image }: { image: { url: string; title: string } }) => (
  <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl">
    <img
      src={image.url}
      alt={image.title}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
);

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
    <section className="bg-secondary_alt py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {subHeading && (
            <span className="text-sm font-semibold text-brand-secondary">
              {subHeading}
            </span>
          )}
          <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
            {heading}
          </h2>
          {supportingText && (
            <p className="mt-4 text-lg text-tertiary md:text-xl">
              {supportingText}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-container flex-col gap-20 px-4 md:px-8">
        {/* CARD 1 */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="self-center lg:pl-12 lg:pr-24">
            <h3 className="text-display-xs font-semibold text-primary">
              {cardTitle1}
            </h3>
            <p className="mt-4 text-lg text-tertiary">{cardText1}</p>
          </div>
          <ImageBlock image={image1} />
        </div>

        {/* CARD 2 */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="self-center lg:order-last lg:pl-24 lg:pr-8">
            <h3 className="text-display-xs font-semibold text-primary">
              {cardTitle2}
            </h3>
            <p className="mt-4 text-lg text-tertiary">{cardText2}</p>
          </div>
          <ImageBlock image={image2} />
        </div>

        {/* CARD 3 */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="self-center lg:pl-12 lg:pr-24">
            <h3 className="text-display-xs font-semibold text-primary">
              {cardTitle3}
            </h3>
            <p className="mt-4 text-lg text-tertiary">{cardText3}</p>
          </div>
          <ImageBlock image={image3} />
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
