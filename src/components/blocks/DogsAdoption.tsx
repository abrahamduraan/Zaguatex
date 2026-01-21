'use client';

import React from "react";
import DogsAdoptionCard from "./DogsAdoptionCard";

interface Dog {
  sys: { id: string };
  title: string;
  description: string;
  image?: { url: string; title?: string; description?: string };
}

interface DogsAdoptionProps {
  dogs: Dog[];
}

export default function DogsAdoption({ dogs }: DogsAdoptionProps) {
  if (!dogs || !dogs.length) return null;

  // Handler interno en el Client Component
  const handleDogClick = (dog: Dog) => {
    console.log("Dog clicked:", dog.title);
    // Aquí puedes abrir modal, navegar a detalle, etc.
  };

  return (
    <div className="mx-auto max-w-container px-4 md:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Dogs for Adoption
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog) => (
          <li key={dog.sys.id}>
            <DogsAdoptionCard
              title={dog.title}
              description={dog.description}
              image={dog.image}
              onClick={() => handleDogClick(dog)} // ✅ función interna
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
