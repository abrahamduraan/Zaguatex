

import { Button } from "@/components/base/buttons/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faWhatsapp, faTiktok } from "@fortawesome/free-brands-svg-icons";

type FooterProps = {
  heading?: string | null;
  subHeading?: string | null;
  logoImage?: { url: string; title?: string } | null;
  footerLinksCollection?: { items: { label: string; href: string }[] };
  socialLinks?: { label: string; href: string }[]; // enlaces manuales
  socialLinksCollection?: { items: { label: string; href: string }[] }; // lo que viene de Contentful
};

const Footer = ({
  heading,
  subHeading,
  logoImage,
  footerLinksCollection,
  socialLinks = [],
  socialLinksCollection,
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  // Mapa de iconos por label (minúsculas)
  const socialIconsMap: Record<string, any> = {
    facebook: faFacebookF,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    tiktok: faTiktok,
  };

  // Combina socialLinks manuales o lo que viene de Contentful
  const socialLinksArray = socialLinks.length
    ? socialLinks
    : socialLinksCollection?.items || [];

  // Filtra solo los enlaces que tengan ícono definido
  const safeSocialLinks = socialLinksArray.filter(link => {
    const key = link.label.trim().toLowerCase();
    return socialIconsMap[key];
  });

  return (
    <footer>
      {/* Sección principal */}
      <div className="bg-primary py-12 md:pt-16">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
            {/* Contenido izquierdo */}
            <div className="flex flex-col items-start gap-6 md:w-1/2">
              {logoImage && (
                <img
                  src={logoImage.url}
                  alt={logoImage.title || "Logo"}
                  className="h-8 w-min shrink-0"
                />
              )}
              {heading && <p className="text-md text-tertiary">{heading}</p>}
              {subHeading && <p className="text-sm text-quaternary">{subHeading}</p>}
            </div>

            {/* Columna de menú derecha */}
            <nav className="flex-1 md:w-1/3">
              <h4 className="text-sm font-semibold text-quaternary mb-4">Menu</h4>
              <ul className="flex flex-col gap-3">
                {footerLinksCollection?.items.length ? (
                  footerLinksCollection.items.map(link => (
                    <li key={link.label}>
                      <Button color="link-gray" size="lg" href={link.href} as="a">
                        {link.label}
                      </Button>
                    </li>
                  ))
                ) : (
                  <li className="text-quaternary text-sm">No hay links disponibles</li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="bg-secondary_alt py-10 md:py-12">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-6">
            <p className="text-md text-quaternary">
              © {currentYear} Dev Abraham Durán. All rights reserved.
            </p>

            {safeSocialLinks.length > 0 && (
              <ul className="flex gap-6">
                {safeSocialLinks.map(link => {
                  const key = link.label.trim().toLowerCase();
                  const Icon = socialIconsMap[key];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex rounded-xs text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <FontAwesomeIcon icon={Icon} size="lg" aria-label={link.label} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
