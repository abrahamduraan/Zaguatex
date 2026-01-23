import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender from '@/components/PageRender';

type PageProps = {
  params: { slug: string };
};

// Genera las páginas estáticas
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const slug = params?.slug;

  if (!slug) return notFound(); // protege contra slug undefined

  const page = await getPageBySlug(slug);

  if (!page) return notFound(); // 404 si no existe

  const components = page.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
