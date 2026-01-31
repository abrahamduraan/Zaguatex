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