import { notFound, redirect } from 'next/navigation';
import { getPageBySlug } from '@/lib/contentful';
import PageRender, { BlockBase } from '@/components/PageRender';

type PageProps = { params: { slug?: string[] } };

export default async function DynamicPage({ params }: PageProps) {
  const slugArray = params.slug ?? [];

  // 🔹 Redirige /home a /
  if (slugArray.length === 1 && slugArray[0].toLowerCase() === 'home') {
    redirect('/');
  }

  // 🔹 Decide qué slug cargar
  const slugToLoad =
    slugArray.length === 0 ? 'home' : slugArray[slugArray.length - 1].toLowerCase();

  const page = await getPageBySlug(slugToLoad);
  if (!page) notFound();

  // 🔹 Forzamos tipo BlockBase[] seguro
  const components: BlockBase[] = page.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
