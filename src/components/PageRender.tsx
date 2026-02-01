// src/components/PageRender.tsx
import { ReactElement } from 'react';
import HeroSection from './blocks/HeroSection';
import MainContentSection from './blocks/MainContentSection';
import CarouselUntitled from './blocks/CarouselUntitled';
import BigCarousel from './blocks/BigCarousel';
import Footer from './blocks/Footer';
import DogsAdoption from './blocks/adoptar/DogsAdoption';
import FAQ from './blocks/FAQ';
import InformationComponent from './blocks/InformationComponent';

/** 🔹 Base type para cualquier bloque */
export interface BlockBase {
  sys: { id: string };
  __typename: string;
  [key: string]: any;
}

/** 🔹 Props del PageRender */
interface PageRenderProps {
  components: BlockBase[];
}

/** 🔹 Map de tipos de bloque a componente */
const BLOCK_COMPONENT_MAP: Record<string, (block: BlockBase) => ReactElement | null> = {
  Hero: (block) => (
    <HeroSection
      key={block.sys.id}
      heading={block.heading ?? ''}
      supportingText={block.supportingText ?? ''}
      buttonOneText={block.buttonOneText ?? ''}
      buttonOneUrl={block.buttonOneUrl ?? '#'}
      buttonTwoText={block.buttonTwoText ?? ''}
      buttonTwoUrl={block.buttonTwoUrl ?? '#'}
      image={block.image ?? null}
    />
  ),

  Main: (block) => (
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
  ),

  Carousel: (block) => (
    <CarouselUntitled
      key={block.sys.id}
      images={block.imagesCollection?.items ?? []}
    />
  ),

  BigCarousel: (block) => (
    <BigCarousel
      key={block.sys.id}
      images={block.imagesCollection?.items ?? []}
    />
  ),

  Footer: (block) => <Footer key={block.sys.id} {...block} />,

  DogsAdoption: (block) => {
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
  },

  Faq: (block) => {
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
  },

  InformationComponent: (block) => {
    const infoItems = block.itemsCollection?.items ?? [];
    if (!infoItems.length) return null;

    return (
      <InformationComponent
        key={block.sys.id}
        heading={block.heading ?? ''}
        introText={block.introText ?? ''}
        image={block.image ?? null}
        items={infoItems.map((item: any) => ({
          title: item.title ?? '',
          text: item.text ?? '',
          media: item.media ?? null,
          mediaPosition: item.mediaPosition ?? 'left',
        }))}
      />
    );
  },
};

export default function PageRender({ components }: PageRenderProps) {
  if (!components || !components.length) return null;

  return (
    <>
      {components.map((block) => {
        const renderFn = BLOCK_COMPONENT_MAP[block.__typename];
        if (!renderFn) {
          console.warn(`Unknown block type: ${block.__typename}`);
          return null;
        }
        return renderFn(block);
      })}
    </>
  );
}