'use client';

import React from "react";

interface DogCardProps {
  title: string;
  description: string;
  image?: { url: string; title?: string };
  onClick?: () => void;
}

const Paw = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <circle cx="16" cy="18" r="6" />
    <circle cx="32" cy="14" r="6" />
    <circle cx="48" cy="18" r="6" />
    <path d="M32 34c-10 0-16 6-16 12 0 6 6 10 16 10s16-4 16-10c0-6-6-12-16-12z" />
  </svg>
);

export default function DogsAdoptionCard({
  title,
  description,
  image,
  onClick,
}: DogCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Patitas blancas decorativas */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Paw className="absolute top-4 left-4 w-14 h-14 text-white opacity-30 rotate-[-20deg]" />
        <Paw className="absolute bottom-20 right-6 w-16 h-16 text-white opacity-25 rotate-[18deg]" />
      </div>

      {/* Contenedor cuadrado */}
      <div className="relative z-10 w-full aspect-square overflow-hidden rounded-[28px]">
        {/* Imagen */}
        {image?.url && (
          <img
            src={image.url}
            alt={image.title || title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:-translate-y-12"
          />
        )}

        {/* TÍTULO / STICKER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div
            className="
              bg-white/90 backdrop-blur
              rounded-full
              px-4 py-1.5
              shadow-md
              text-gray-900 font-semibold text-base
              rotate-[-1deg]
              transition-all duration-300
              group-hover:-translate-y-12
              group-hover:scale-125
              group-hover:px-6
              group-hover:py-2.5
            "
          >
            {title}
          </div>
        </div>

        {/* Descripción reveal */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            px-6 pb-6 pt-6
            text-center
            bg-brand-solid
            translate-y-full
            opacity-0
            transition-all duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <p className="text-sm text-white font-semibold leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>
      </div>

      {/* Patita guiño */}
      <Paw
        className="
          absolute bottom-0 right-2 z-10
          w-8 h-8 text-white
          opacity-0 scale-75
          transition-all duration-300
          group-hover:opacity-80
          group-hover:scale-100
          group-hover:rotate-12
        "
      />
    </div>
  );
}
