import HeroSection from "./sections/HeroSection";
import FeatureGrid from "./sections/FeatureGrid";
import RichTextSection from "./sections/RichTextSection";

// PageRenderer receives the array of components from Contentful
export default function PageRenderer({ components }) {
  if (!components || !components.length) {
    return null;
  }

  return (
    <>
      {components.map((block) => {
        const type = block.__typename;

        /* switch (type) {
          case "HeroSection":
            return <HeroSection key={block.sys.id} {...block} />;

          case "FeatureGrid":
            return <FeatureGrid key={block.sys.id} {...block} />;

          case "RichTextSection":
            return <RichTextSection key={block.sys.id} {...block} />;

          default:
            console.warn(`Unknown block type: ${type}`);
            return null;
        } */
      })}
    </>
  );
}
