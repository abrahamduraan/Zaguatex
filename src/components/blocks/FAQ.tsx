'use client';

import { useState } from "react";
import { motion } from "motion/react";
import { cx } from "@/utils/cx";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading?: string;
  subheading?: string;
  items: FAQItem[];
}

export default function FAQ({
  heading,
  subheading,
  items,
}: FAQProps) {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set([0]));

  if (!items || !items.length) return null;

  const toggle = (index: number) => {
    const next = new Set(openQuestions);
    next.has(index) ? next.delete(index) : next.add(index);
    setOpenQuestions(next);
  };

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8">

        {/* Subtitle (igual a DogsAdoption) */}
        {subheading && (
          <p className="text-brand-secondary text-lg font-semibold md:text-xl mb-4 text-center">
            {subheading}
          </p>
        )}

        {/* Title (igual a DogsAdoption) */}
        {heading && (
          <h2 className="text-brand-primary text-3xl md:text-4xl font-bold mb-12 text-center">
            {heading}
          </h2>
        )}

        <div className="mx-auto max-w-3xl flex flex-col gap-6">
          {items.map((faq, index) => {
            const isOpen = openQuestions.has(index);

            return (
              <div
                key={index}
                className={cx(
                  "w-full",
                  "not-first:border-t border-secondary",
                  "not-first:pt-6"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  {/* Question */}
                  <span className="text-brand-secondary text-lg font-semibold">
                    {faq.question}
                  </span>

                  <span className="flex size-6 items-center text-quaternary-fg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line
                        className={cx(
                          "origin-center transition duration-150",
                          isOpen && "-rotate-90"
                        )}
                        x1="12"
                        y1="8"
                        x2="12"
                        y2="16"
                      />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    damping: 24,
                    stiffness: 240,
                  }}
                  className="overflow-hidden"
                >
                  {/* Answer */}
                  <div className="pt-3 pr-4">
                    <p className="text-tertiary text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
