import PageRender, { ContentfulBlock } from '@/components/PageRender';
import { getPageBySlug } from '@/lib/contentful';

export default async function HomePage() {
  const page = await getPageBySlug('home');
  
  if (!page) return <p>No se encontró la página home.</p>;

  const components: ContentfulBlock[] = page.componentsCollection?.items || [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
