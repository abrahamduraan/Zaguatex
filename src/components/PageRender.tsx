import HeroSection from "./blocks/HeroSection";
import MainContentSection from "./blocks/MainContentSection";

// PageRenderer receives the array of components from Contentful
export default function PageRender({ components = [] }) {
  if (!components || !components.length) {
    return null;
  }

  return (
    <>
      {components.map((block) => {
        const type = block.__typename;

        switch (type) {
          case "Hero":
            return <HeroSection key={block.sys.id} {...block} />;

          case "Main":
            return <MainContentSection key={block.sys.id} {...block} />;

          default:
            console.warn(`Unknown block type: ${type}`);
            return null;
        }
      })}
    </>
  );
}
