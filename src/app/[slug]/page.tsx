// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender from '@/components/PageRender';

type PageProps = {
  params: {
    slug: string;
  };
};

// Genera rutas estáticas para todos los slugs existentes, excepto "home"
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  return slugs
    .filter(slug => slug !== 'home')
    .map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params; // necesario en Next 16+
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  const components = page.componentsCollection.items; // ✅ siempre seguro

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}

