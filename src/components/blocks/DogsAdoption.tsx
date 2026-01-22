'use client';

import DogsAdoptionCard from "./DogsAdoptionCard";
import { Button } from "@/components/base/buttons/button";

interface Dog {
  sys: { id: string };
  title: string;
  description: string;
  image?: { url: string; title?: string; description?: string };
}

interface DogsAdoptionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  dogs: Dog[];
}

export default function DogsAdoption({
  title,
  subtitle,
  buttonText,
  buttonUrl,
  dogs,
}: DogsAdoptionProps) {
  if (!dogs || !dogs.length) return null;

  const handleDogClick = (dog: Dog) => {
    console.log("Dog clicked:", dog.title);
    // Aquí puedes abrir modal, navegar a detalle, etc.
  };

  return (
    <div className="mx-auto max-w-container px-4 md:px-8 py-12 text-center">

      {/* Subtítulo */}
      {subtitle && <p className="text-brand-secondary text-lg font-semibold md:text-xl mb-4">{subtitle}</p>}

      {/* Título */}
      {title && <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-8">{title}</h2>}

      {/* Botón único */}
      {buttonText && buttonUrl && (
        <div className="mb-12 flex justify-center">
          <Button
            size="xl"
            href={buttonUrl}
            color="primary"
          >
            {buttonText}
          </Button>
        </div>
      )}

      {/* Catálogo de perros */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog, index) => (
          <li key={`${dog.sys.id}-${index}`}>
            <DogsAdoptionCard
              title={dog.title}
              description={dog.description}
              image={dog.image}
              onClick={() => handleDogClick(dog)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
