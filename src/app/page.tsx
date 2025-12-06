import { getPageBySlug } from "@/lib/contentful";
import PageRender from "@/components/PageRender";

export default async function HomePage() {
  const page = await getPageBySlug("home");

  if (!page) {
    return <p>No se encontró la página home.</p>;
  }
  
  const components = page?.componentsCollection?.items ?? [];

  return (
    <main>
      <PageRender components={components} />
    </main>
  );
}
