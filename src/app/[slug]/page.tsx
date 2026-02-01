// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender from '@/components/PageRender';

type PageProps = {
  params: {
    slug: string;
  };
};

// Esto evita que se genere /home dinámicamente
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs
    .filter(slug => slug !== 'home') // <--- home ya tiene su propia página
    .map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params; // necesario en Next 16+
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound(); // Next.js 404
  }

  const components = page.componentsCollection.items;

  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      <PageRender components={components} />
    </main>
  );
}
