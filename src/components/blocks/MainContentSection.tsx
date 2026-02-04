'use client';

import { motion } from "motion/react";

type MainContentSectionProps = {
  heading: string;
  subHeading?: string | null;
  supportingText?: string | null;

  cardTitle1: string;
  cardText1: string;
  cardTitle2: string;
  cardText2: string;
  cardTitle3: string;
  cardText3: string;

  image1: { url: string; title: string; description?: string | null };
  image2: { url: string; title: string; description?: string | null };
  image3: { url: string; title: string; description?: string | null };
};

const ImageBlock = ({ image }: { image: { url: string; title: string } }) => (
  <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl">
    <img
      src={image.url}
      alt={image.title}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
);

export default function MainContentSection({
  heading,
  subHeading,
  supportingText,
  cardTitle1,
  cardText1,
  cardTitle2,
  cardText2,
  cardTitle3,
  cardText3,
  image1,
  image2,
  image3,
}: MainContentSectionProps) {
  const cards = [
    { title: cardTitle1, text: cardText1, image: image1, reverse: false },
    { title: cardTitle2, text: cardText2, image: image2, reverse: true },
    { title: cardTitle3, text: cardText3, image: image3, reverse: false },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      {/* Heading */}
      <div className="mx-auto max-w-container px-4 md:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {subHeading && (
            <motion.span
              style={{ color: "var(--color-orange)" }}
              className="text-sm font-semibold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {subHeading}
            </motion.span>
          )}
          <motion.h2
            style={{ color: "var(--color-blue)" }}
            className="mt-3 text-display-sm font-semibold md:text-display-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
          {supportingText && (
            <motion.p
              style={{ color: "var(--color-gray)" }}
              className="mt-4 text-lg md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {supportingText}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-16 flex max-w-container flex-col gap-20 px-4 md:px-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`
              flex flex-col items-center text-center gap-8
              lg:grid lg:grid-cols-2 lg:gap-10
              ${card.reverse ? 'lg:grid-flow-col-dense' : ''}
            `}
            initial={{ opacity: 0, x: card.reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.2 }}
          >
            {/* Imagen */}
            <div className={`w-full ${card.reverse ? 'lg:order-last' : 'lg:order-first'}`}>
              <ImageBlock image={card.image} />
            </div>

            {/* Texto */}
            <div className="w-full flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-12 lg:pr-24">
              <h3
                style={{ color: "var(--color-yellow)" }}
                className="text-display-xs font-semibold"
              >
                {card.title}
              </h3>
              <p
                style={{ color: "var(--color-gray)" }}
                className="mt-4 text-lg"
              >
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
