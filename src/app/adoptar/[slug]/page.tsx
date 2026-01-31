// src/app/adoptar/[slug]/page.tsx
import DogInfo from '@/components/blocks/adoptar/DogInfo';
import { getDogByTitle } from '@/lib/contentful';

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function DogDetailPage({ params }: Props) {
  // ⚡️ Importante: await porque params puede ser Promise en Turbopack
  const resolvedParams = await params;
  const title = decodeURIComponent(resolvedParams.slug).replace(/-/g, ' ');

  const dog = await getDogByTitle(title);

  if (!dog) {
    return (
      <p className="text-center py-12 text-lg text-red-500">
        Perro no encontrado
      </p>
    );
  }

  return (
    <DogInfo
      title={dog.title}
      description={dog.description}
      information={dog.information}
      mainImage={dog.mainImage}
      galleryImages={dog.galleryImages}
    />
  );
}
