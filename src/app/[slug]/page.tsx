import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageBySlug } from '@/lib/contentful';
import PageRender from '@/components/PageRender';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs
    .filter(slug => slug !== 'home')
    .map(slug => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PageRender components={page.componentsCollection.items} />;
}
