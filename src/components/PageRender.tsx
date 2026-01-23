import HeroSection from './blocks/HeroSection';
import MainContentSection from './blocks/MainContentSection';
import CarouselUntitled from './blocks/CarouselUntitled';
import BigCarousel from './blocks/BigCarousel';
import Footer from './blocks/Footer';
import DogsAdoption from './blocks/DogsAdoption';
import FAQ from "./blocks/FAQ";
import InformationComponent from './blocks/InformationComponent';

// Tipo genérico para bloques de Contentful
export type ContentfulBlock = {
  __typename: string;
  sys: { id: string };
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  heading?: string;
  subheading?: string;
  introText?: string;
  image?: any;
  itemsCollection?: { items: any[] };
  dogsCollection?: { items: any[] };
  imagesCollection?: { items: any[] };
  [key: string]: any;
};

type PageRenderProps = {
  components?: ContentfulBlock[];
};

// PageRender recibe el array de bloques desde Contentful
export default function PageRender({ components = [] }: PageRenderProps) {
  if (!components || components.length === 0) return null;

  return (
    <>
      {components.map((block: ContentfulBlock) => {
        const type = block.__typename;

        switch (type) {
          case 'Hero':
            return <HeroSection key={block.sys.id} {...block} />;

          case 'Main':
            return <MainContentSection key={block.sys.id} {...block} />;

          case 'Carousel': {
            const images: any[] = block.imagesCollection?.items ?? [];
            return <CarouselUntitled key={block.sys.id} images={images} />;
          }

          case 'BigCarousel': {
            const images: any[] = block.imagesCollection?.items ?? [];
            return <BigCarousel key={block.sys.id} images={images} />;
          }

          case 'Footer':
            return <Footer key={block.sys.id} {...block} />;

          case 'DogsAdoption': {
            const dogs: any[] = block.dogsCollection?.items ?? [];
            if (dogs.length === 0) return null;

            return (
              <DogsAdoption
                key={block.sys.id}
                title={block.title}
                subtitle={block.subtitle}
                buttonText={block.buttonText}
                buttonUrl={block.buttonUrl}
                dogs={dogs}
              />
            );
          }

          case 'Faq': {
            const faqItems: any[] = block.itemsCollection?.items ?? [];
            if (faqItems.length === 0) return null;

            return (
              <FAQ
                key={block.sys.id}
                heading={block.heading}
                subheading={block.subheading}
                items={faqItems}
              />
            );
          }

          case 'InformationComponent': {
            const infoItems: any[] = block.itemsCollection?.items ?? [];
            if (infoItems.length === 0) return null;

            return (
              <InformationComponent
                key={block.sys.id}
                heading={block.heading}
                introText={block.introText}
                image={block.image}
                items={infoItems.map((item: any) => ({
                  title: item.title,
                  text: item.text,
                  media: item.media,
                  mediaPosition: item.mediaPosition,
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
