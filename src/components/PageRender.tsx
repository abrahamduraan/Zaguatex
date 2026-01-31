import HeroSection from './blocks/HeroSection';
import MainContentSection from './blocks/MainContentSection';
import CarouselUntitled from './blocks/CarouselUntitled';
import BigCarousel from './blocks/BigCarousel';
import Footer from './blocks/Footer';
import DogsAdoption from './blocks/adoptar/DogsAdoption';
import FAQ from "./blocks/FAQ";
import InformationComponent from './blocks/InformationComponent';

// Base type para cualquier bloque
interface BlockBase {
  sys: { id: string };
  __typename: string;
  [key: string]: any;
}

interface PageRenderProps {
  components: BlockBase[];
}

export default function PageRender({ components = [] }: PageRenderProps) {
  if (!components.length) return null;

  return (
    <>
      {components.map((block) => {
        const type = block.__typename;

        switch (type) {
          case 'Hero': {
            return (
              <HeroSection
                key={block.sys.id}
                heading={block.heading ?? ''}
                supportingText={block.supportingText ?? ''}
                buttonOneText={block.buttonOneText ?? ''}
                buttonOneUrl={block.buttonOneUrl ?? '#'}
                buttonTwoText={block.buttonTwoText ?? ''}
                buttonTwoUrl={block.buttonTwoUrl ?? '#'}
                image={block.image ?? null} // fallback a null
              />
            );
          }

          case 'Main': {
            return (
              <MainContentSection
                key={block.sys.id}
                heading={block.heading ?? ''}
                subHeading={block.subHeading ?? ''}
                supportingText={block.supportingText ?? ''}
                cardTitle1={block.cardTitle1 ?? ''}
                cardText1={block.cardText1 ?? ''}
                cardTitle2={block.cardTitle2 ?? ''}
                cardText2={block.cardText2 ?? ''}
                cardTitle3={block.cardTitle3 ?? ''}
                cardText3={block.cardText3 ?? ''}
                image1={block.image1 ?? null}
                image2={block.image2 ?? null}
                image3={block.image3 ?? null}
              />
            );
          }

          case 'Carousel':
            return (
              <CarouselUntitled
                key={block.sys.id}
                images={block.imagesCollection?.items ?? []} // fallback array vacío
              />
            );

          case 'BigCarousel':
            return (
              <BigCarousel
                key={block.sys.id}
                images={block.imagesCollection?.items ?? []}
              />
            );

          case 'Footer':
            return <Footer key={block.sys.id} {...block} />; // Footer ya maneja fallbacks internos

          case 'DogsAdoption': {
            const dogs = (block.dogsCollection?.items ?? []).map((dog: any) => ({
              sys: dog.sys,
              title: dog.title ?? '',
              description: dog.description ?? '',
              information: dog.information ?? '',
              mainImage: dog.mainImage ?? null,
              galleryImages: dog.galleryImagesCollection?.items ?? [],
            }));

            if (!dogs.length) return null;

            return (
              <DogsAdoption
                key={block.sys.id}
                title={block.title ?? ''}
                subtitle={block.subtitle ?? ''}
                buttonText={block.buttonText ?? ''}
                buttonUrl={block.buttonUrl ?? '#'}
                dogs={dogs}
              />
            );
          }

          case 'Faq': {
            const faqItems = block.itemsCollection?.items ?? [];
            if (!faqItems.length) return null;

            return (
              <FAQ
                key={block.sys.id}
                heading={block.heading ?? ''}
                subheading={block.subheading ?? ''}
                items={faqItems.map((item: any) => ({
                  question: item.question ?? '',
                  answer: item.answer ?? '',
                }))}
              />
            );
          }

          case 'InformationComponent': {
            const infoItems = block.itemsCollection?.items ?? [];
            if (!infoItems.length) return null;

            return (
              <InformationComponent
                key={block.sys.id}
                heading={block.heading ?? ''}
                introText={block.introText ?? ''}
                image={block.image ?? null} // fallback
                items={infoItems.map((item: any) => ({
                  title: item.title ?? '',
                  text: item.text ?? '',
                  media: item.media ?? null,
                  mediaPosition: item.mediaPosition ?? 'left', // fallback default
                }))}
              />
            );
          }

          default:
            console.warn(`Unknown block type: ${type}`);
            return null;
        }
      })}
    </>
  );
}
