'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/base/buttons/button';
import { PlayCircle } from '@untitledui/icons';

type HeroProps = {
  heading?: string;
  supportingText?: string;
  buttonOneText?: string;
  buttonOneUrl?: string;
  buttonTwoText?: string;
  buttonTwoUrl?: string;
  image?: { url: string; title?: string; description?: string } | null;
};

export default function HeroSection({
  heading,
  supportingText,
  buttonOneText,
  buttonOneUrl,
  buttonTwoText,
  buttonTwoUrl,
  image
}: HeroProps) {
  if (!image?.url) return null;

  return (
    <section
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="relative flex flex-col flex-1 items-center justify-center w-full h-screen"
    >
      <div className="flex flex-col items-center justify-center w-full pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto w-full max-w-container flex flex-col px-4 md:px-8 items-center text-center">

          {heading && (
            <motion.h1
              className="mt-4 text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {heading}
            </motion.h1>
          )}

          {supportingText && (
            <motion.p
              className="mt-4 max-w-3xl text-lg text-brand-secondary md:mt-6 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              {supportingText}
            </motion.p>
          )}

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            {buttonOneText && buttonOneUrl && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button iconLeading={PlayCircle} color="secondary" size="xl" href={buttonOneUrl}>
                  {buttonOneText}
                </Button>
              </motion.div>
            )}

            {buttonTwoText && buttonTwoUrl && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button size="xl" href={buttonTwoUrl}>
                  {buttonTwoText}
                </Button>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
