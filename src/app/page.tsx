// src/app/page.tsx
import PageRender from '@/components/PageRender';
import { getPageBySlug } from '@/lib/contentful';

export default async function HomePage() {
  const page = await getPageBySlug('home'); // ⚡ slug "home" de Contentful

  if (!page) return <p>No se encontró la página home.</p>;

  const components = page.componentsCollection?.items ?? [];

  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      <PageRender components={components} />
    </main>
  );
}
