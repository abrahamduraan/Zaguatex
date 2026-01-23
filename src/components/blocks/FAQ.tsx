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

        {/* Subtitle */}
        {subheading && (
          <motion.p
            className="text-brand-secondary text-lg font-semibold md:text-xl mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {subheading}
          </motion.p>
        )}

        {/* Heading */}
        {heading && (
          <motion.h2
            className="text-brand-primary text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {heading}
          </motion.h2>
        )}

        <div className="mx-auto max-w-3xl flex flex-col gap-6">
          {items.map((faq, index) => {
            const isOpen = openQuestions.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
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

                  {/* Animated Icon */}
                  <motion.span
                    className="flex size-6 items-center text-quaternary-fg"
                    animate={{ rotate: isOpen ? -90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
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
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </motion.span>
                </button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pr-4">
                    <p className="text-tertiary text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
