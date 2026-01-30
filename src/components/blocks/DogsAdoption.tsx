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

      {subtitle && <p className="text-brand-secondary text-lg font-semibold mb-3">{subtitle}</p>}


      {title && <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-8">{title}</h2>}

      {buttonText && buttonUrl && (
        <div className="mb-12 flex justify-center">
          <Button size="xl" href={buttonUrl} color="primary">{buttonText}</Button>
        </div>
      )}

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

      {selectedDog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden bg-black/30"
          onClick={() => setSelectedDog(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-brand-solid rounded-3xl w-full max-w-3xl max-h-[90vh] p-6 relative shadow-xl overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <Button onClick={() => setSelectedDog(null)} color="secondary">
                X
              </Button>
            </div>

            {currentImages.length > 0 && (
              <div className="relative w-full mb-4 select-none overflow-hidden rounded-2xl">
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
                    className="w-full h-auto max-h-80 object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

                <Button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 p-3 rounded-full hover:scale-110 transition"
                  color="primary"
                >
                  ‹
                </Button>
                <Button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 p-3 rounded-full hover:scale-110 transition"
                  color="primary"
                >
                  ›
                </Button>

                {currentImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    {currentImages.map((img, i) => (
                      <img
                        key={i}
                        src={img?.url}
                        alt={img?.title || ""}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-12 h-12 object-cover rounded-full cursor-pointer border-2 transition ${
                          i === galleryIndex ? "border-yellow-400" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <h3 className="text-2xl font-semibold mb-2 text-white">{selectedDog.title}</h3>

            <p className="leading-relaxed mb-4 text-white break-words whitespace-pre-line">
              {selectedDog.description}
            </p>

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
