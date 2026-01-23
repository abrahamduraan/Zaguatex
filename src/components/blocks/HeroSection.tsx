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
  image: { url: string; title: string; description?: string };
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
  return (
    <section
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="relative flex items-center h-screen"
    >
      <div className="flex flex-col items-center w-full pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto w-full max-w-container flex-col px-4 md:px-8 flex items-start sm:items-center sm:text-center">

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

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            {buttonOneText && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button
                  iconLeading={PlayCircle}
                  color="secondary"
                  size="xl"
                  href={buttonOneUrl}
                  className="hover:bg-brand-secondary-dark"
                >
                  {buttonOneText}
                </Button>
              </motion.div>
            )}
            {buttonTwoText && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button
                  size="xl"
                  href={buttonTwoUrl}
                  className="hover:bg-brand-solid_dark"
                >
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
