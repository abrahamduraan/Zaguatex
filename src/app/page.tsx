import { getPageBySlug } from '@/lib/contentful';
import PageRender, { ContentfulBlock } from '@/components/PageRender';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) return <p>Página no encontrada</p>;

  const components: ContentfulBlock[] = page.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
