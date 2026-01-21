'use client';

import React from "react";

interface DogCardProps {
  title: string;
  description: string;
  image?: { url: string; title?: string; description?: string };
  onClick?: () => void;
}

export default function DogsAdoptionCard({
  title,
  description,
  image,
  onClick,
}: DogCardProps) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick} // ✅ aquí se usa la función interna de DogsAdoption
    >
      {image?.url && (
        <img
          src={image.url}
          alt={image.title || title}
          className="w-full h-56 object-cover"
        />
      )}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}
