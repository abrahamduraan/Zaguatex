// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender, { BlockBase } from '@/components/PageRender';

type PageProps = { params: { slug: string } };

// Genera rutas estáticas excepto "home"
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs
    .filter(slug => slug !== 'home')
    .map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = params;

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  // ⚡ Aseguramos tipado correcto
  const components: BlockBase[] = page.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
