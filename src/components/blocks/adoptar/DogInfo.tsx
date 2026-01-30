'use client';

import { motion } from 'motion/react';
import React, { useState } from 'react';

interface Image {
  url: string;
  title?: string;
  description?: string;
}

interface DogInfoProps {
  title: string;
  description: string;
  mainImage?: Image;
  galleryImages?: Image[];
}

export default function DogInfo({
  title,
  description,
  mainImage,
  galleryImages = [],
}: DogInfoProps) {
  const [modalImage, setModalImage] = useState<Image | null>(null);

  // Limitar la galería a máximo 5 imágenes
  const displayedGallery = galleryImages.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-12">

      {/* 🌟 Título */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-brand-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>

      {/* 📝 Descripción */}
      <motion.div
        className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed text-justify"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {description.split('\n').map((para, i) => (
          <p key={i} className="mb-4 break-words">
            {para}
          </p>
        ))}
      </motion.div>

      {/* 🖼 Main + Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Imagen principal ocupa más columnas */}
        {mainImage?.url && (
          <motion.div
            className="md:col-span-8 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setModalImage(mainImage)}
          >
            <img
              src={mainImage.url}
              alt={mainImage.title || title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Galería */}
        {displayedGallery.length > 0 && (
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
            {displayedGallery.map((img, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setModalImage(img)}
              >
                <img
                  src={img.url}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-32 md:h-40 lg:h-48 object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal para imagen */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <motion.div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // evita cerrar al click en la imagen
          >
            <img
              src={modalImage.url}
              alt={modalImage.title || 'Imagen'}
              className="w-full h-full max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-brand-solid text-white rounded-full p-2 shadow-lg text-xl hover:opacity-90 transition-opacity"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
