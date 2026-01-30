'use client';

import { useState } from "react";
import { motion, useAnimation } from "motion/react";
import DogsAdoptionCard from "./DogsAdoptionCard";
import { Button } from "@/components/base/buttons/button";

interface Dog {
  sys: { id: string };
  title: string;
  description: string;
  mainImage?: { url: string; title?: string };
  galleryImages?: { url: string; title?: string }[];
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
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!dogs?.length) return null;

  const currentImages = selectedDog
    ? [selectedDog.mainImage, ...(selectedDog.galleryImages || [])].filter(Boolean)
    : [];

  const controls = useAnimation();

  const prevImage = () => {
    if (galleryIndex > 0) {
      setGalleryIndex(galleryIndex - 1);
      controls.start({ x: [-100, 0], opacity: [0, 1] });
    }
  };

  const nextImage = () => {
    if (galleryIndex < currentImages.length - 1) {
      setGalleryIndex(galleryIndex + 1);
      controls.start({ x: [100, 0], opacity: [0, 1] });
    }
  };

  const handleDragEnd = (offsetX: number, velocityX: number) => {
    if (offsetX < -50 || velocityX < -500) nextImage();
    else if (offsetX > 50 || velocityX > 500) prevImage();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-12 text-center">
      {/* Subtítulo */}
      {subtitle && <p className="text-brand-secondary text-lg font-semibold mb-3">{subtitle}</p>}

      {/* Título */}
      {title && <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-8">{title}</h2>}

      {/* Botón opcional */}
      {buttonText && buttonUrl && (
        <div className="mb-12 flex justify-center">
          <Button size="xl" href={buttonUrl} color="primary">{buttonText}</Button>
        </div>
      )}

      {/* Catálogo de cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <li key={dog.sys.id} onClick={() => { setSelectedDog(dog); setGalleryIndex(0); }}>
            <DogsAdoptionCard
              title={dog.title}
              description={dog.description}
              image={dog.mainImage}
            />
          </li>
        ))}
      </ul>

      {/* Modal */}
      {selectedDog && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-x-hidden"
          onClick={() => setSelectedDog(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-brand-solid rounded-2xl w-full max-w-3xl max-h-[90vh] p-6 relative shadow-lg overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <div className="flex justify-end mb-2">
              <Button onClick={() => setSelectedDog(null)} color="secondary">
                X
              </Button>
            </div>

            {/* Carrusel premium */}
            {currentImages.length > 0 && (
              <div className="relative w-full mb-4 select-none overflow-hidden rounded-lg">
                <motion.div
                  animate={controls}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => handleDragEnd(info.offset.x, info.velocity.x)}
                >
                  <img
                    src={currentImages[galleryIndex]?.url}
                    alt={currentImages[galleryIndex]?.title || selectedDog.title}
                    className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg"
                  />
                </motion.div>

                {/* Flechas */}
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
                >
                  ›
                </button>

                {/* Miniaturas */}
                {currentImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    {currentImages.map((img, i) => (
                      <img
                        key={i}
                        src={img?.url}
                        alt={img?.title || ""}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-12 h-12 object-cover rounded cursor-pointer border-2 transition ${
                          i === galleryIndex ? "border-white" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Título */}
            <h3 className="text-2xl font-bold mb-2">{selectedDog.title}</h3>

            {/* Descripción completa */}
            <p className="leading-relaxed mb-4 break-words whitespace-pre-line">
              {selectedDog.description}
            </p>

            {/* Botón opcional */}
            {buttonText && buttonUrl && (
              <div className="flex justify-center mt-4">
                <Button size="xl" href={buttonUrl} color="primary">{buttonText}</Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
