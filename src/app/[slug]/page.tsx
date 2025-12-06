// src/app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllPageSlugs, getPageBySlug } from "@/lib/contentful";
import PageRenderer from "@/components/PageRenderer";

type PageProps = {
  params: {
    slug: string;
  };
};

// This will generate static pages for each slug from Contentful
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound(); // Next.js 404
  }

  const components = page.componentsCollection.items;

  return (
    <main>
      <PageRenderer components={components} />
    </main>
  );
}
