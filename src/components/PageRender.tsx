import HeroSection from './blocks/HeroSection';
import MainContentSection from './blocks/MainContentSection';
import CarouselUntitled from './blocks/CarouselUntitled';
import BigCarousel from './blocks/BigCarousel';
import Footer from './blocks/Footer';
import DogsAdoption from './blocks/DogsAdoption'; // <- importamos el nuevo bloque

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

            return <DogsAdoption key={block.sys.id} dogs={dogs} />;

          default:
            console.warn(`Unknown block type: ${type}`);
            return null;
        }
      })}
    </>
  );
}
