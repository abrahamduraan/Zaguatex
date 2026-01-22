import HeroSection from './blocks/HeroSection';
import MainContentSection from './blocks/MainContentSection';
import CarouselUntitled from './blocks/CarouselUntitled';
import BigCarousel from './blocks/BigCarousel';
import Footer from './blocks/Footer';
import DogsAdoption from './blocks/DogsAdoption';
import FAQ from "./blocks/FAQ";
import InformationComponent from './blocks/InformationComponent';

// PageRenderer receives the array of components from Contentful
export default function PageRender({ components = [] }) {
  if (!components || !components.length) {
    return null;
  }

  return (
    <>
      {components.map((block) => {
        const type = block.__typename;

        switch (type) {
          case 'Hero':
            return <HeroSection key={block.sys.id} {...block} />;

          case 'Main':
            return <MainContentSection key={block.sys.id} {...block} />;

          case 'Carousel':
            return (
              <CarouselUntitled
                key={block.sys.id}
                images={block.imagesCollection?.items || []}
              />
            );

          case 'BigCarousel':
            return (
              <BigCarousel
                key={block.sys.id}
                images={block.imagesCollection?.items || []}
              />
            );

          case 'Footer':
            return <Footer key={block.sys.id} {...block} />;

          case 'DogsAdoption':
            const dogs = block.dogsCollection?.items || [];
            if (!dogs.length) return null;

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
          case "Faq":
            const faqItems = block.itemsCollection?.items || [];
            if (!faqItems.length) return null;

            return (
              <FAQ
                key={block.sys.id}
                heading={block.heading}
                subheading={block.subheading}
                items={faqItems}
              />
            );

          case 'InformationComponent':
            const infoItems = block.itemsCollection?.items || [];
            if (!infoItems.length) return null;

            return (
              <InformationComponent
                key={block.sys.id}
                heading={block.heading}
                introText={block.introText}
                image={block.image} // si quieres que la sección tenga imagen principal
                items={infoItems.map((item: any) => ({
                  title: item.title,
                  text: item.text,
                  media: item.media,
                  mediaPosition: item.mediaPosition, 
                }))}
              />
            );

          default:
            console.warn(`Unknown block type: ${type}`);
            return null;
        }
      })}
    </>
  );
}
