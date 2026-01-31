// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender from '@/components/PageRender';

type PageProps = {
  params: {
    slug: string;
  };
};

// Genera rutas estáticas para todos los slugs, excepto "home"
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  return slugs
    .filter(slug => slug !== 'home') // home no se genera aquí
    .map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = params; // ✅ params ya viene listo, no es necesario await
  const page = await getPageBySlug(slug);

  if (!page) notFound(); // 404 si no existe

  const components = page.componentsCollection.items;

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
