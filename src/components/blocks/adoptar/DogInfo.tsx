'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Image {
  url: string;
  title?: string;
  description?: string;
}

interface DogInfoProps {
  title: string;
  description: string;
  information: string;
  mainImage?: Image;
  galleryImages?: Image[];
}

export default function DogInfo({
  title,
  description,
  information,
  mainImage,
  galleryImages = [],
}: DogInfoProps) {
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const displayedGallery = galleryImages.slice(0, 6);

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* ===================== MOBILE ===================== */}
      <section className="block lg:hidden space-y-6">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-primary text-center">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center whitespace-pre-line break-words hyphens-auto">
          {description}
        </p>

        {/* MAIN IMAGE */}
        {mainImage?.url && (
          <motion.div
            className="relative aspect-square overflow-hidden rounded-3xl shadow-xl cursor-pointer"
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 220 }}
            onClick={() => setModalImage(mainImage)}
          >
            <img
              src={mainImage.url}
              alt={mainImage.title || title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}

        {/* GALLERY */}
        {displayedGallery.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {displayedGallery.map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-md cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220 }}
                onClick={() => setModalImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.title || `Imagen ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* INFORMATION */}
        {information && (
          <section className="rounded-2xl bg-[#F5EFE6] px-5 sm:px-6 py-5">
            <div className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line break-words hyphens-auto">
              {information}
            </div>
          </section>
        )}
      </section>

      {/* ===================== DESKTOP ===================== */}
      <section className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
        {/* IMAGES */}
        <div className="lg:col-span-6 space-y-6">
          {mainImage?.url && (
            <motion.div
              className="relative aspect-square overflow-hidden rounded-3xl shadow-xl cursor-pointer"
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 220 }}
              onClick={() => setModalImage(mainImage)}
            >
              <img
                src={mainImage.url}
                alt={mainImage.title || title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          {displayedGallery.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {displayedGallery.map((img, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-2xl shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 220 }}
                  onClick={() => setModalImage(img)}
                >
                  <img
                    src={img.url}
                    alt={img.title || `Imagen ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* TEXT */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-primary">
            {title}
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line break-words hyphens-auto">
            {description}
          </p>

          {information && (
            <section className="rounded-2xl bg-[#F5EFE6] px-5 sm:px-6 py-5">
              <div className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line break-words hyphens-auto">
                {information}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* ===================== MODAL ===================== */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setModalImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <img
                src={modalImage.url}
                alt={modalImage.title || 'Imagen'}
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-2xl shadow-2xl"
              />

              <button
                onClick={() => setModalImage(null)}
                className="absolute -top-3 -right-3 rounded-full bg-brand-solid text-white p-2 shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/60"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
