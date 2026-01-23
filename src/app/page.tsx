import { getPageBySlug } from '@/lib/contentful';
import PageRender, { ContentfulBlock } from '@/components/PageRender';

export default async function HomePage() {
  const page = await getPageBySlug('home');

  if (!page) {
    return <p>No se encontró la página home.</p>;
  }

  // Tipamos explícitamente como ContentfulBlock[]
  const components: ContentfulBlock[] = page.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
