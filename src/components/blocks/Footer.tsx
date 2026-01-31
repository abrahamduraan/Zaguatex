'use client';

import { Button } from "@/components/base/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Íconos de marcas
import { faFacebookF, faInstagram, faWhatsapp, faTiktok, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Íconos sólidos
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

type FooterContact = {
  label: string;
  icon: "Location" | "Number" | "Email";
};

type FooterProps = {
  heading?: string | null;
  subHeading?: string | null;
  logoImage?: { url: string; title?: string } | null;
  footerLinksCollection?: { items: { label: string; href: string }[] };
  socialLinks?: { label: string; href: string }[];
  contactCollection?: FooterContact[];
};

const Footer = ({
  heading,
  subHeading,
  logoImage,
  footerLinksCollection,
  socialLinks = [],
  contactCollection = [],
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialIconsMap: Record<string, any> = {
    facebook: faFacebookF,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    tiktok: faTiktok,
  };

  const contactIconsMap: Record<string, any> = {
    Location: faMapMarkerAlt,
    Number: faPhone,
    Email: faEnvelope,
  };

  const safeSocialLinks = socialLinks
    .map(link => {
      const key = link.label.trim().toLowerCase();
      const Icon = socialIconsMap[key];
      if (!Icon) return null;
      return { ...link, Icon };
    })
    .filter(Boolean) as (typeof socialLinks[0] & { Icon: any })[];

  return (
    <footer>
      {/* Sección principal */}
      <div
        className="py-12 md:py-16"
        style={{ backgroundColor: 'rgb(242, 242, 242)' }} // gris claro
      >
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

            {/* Logo */}
            <div className="flex flex-col justify-start items-start">
              {logoImage && (
                <img
                  src={logoImage.url}
                  alt={logoImage.title || "Logo"}
                  className="h-16 w-auto mb-2"
                />
              )}
            </div>

            {/* Heading + Subheading */}
            <div className="flex flex-col justify-start">
              {heading && (
                <p className="text-lg font-semibold text-tertiary mb-1 max-w-[200px] break-words">
                  {heading}
                </p>
              )}
              {subHeading && (
                <p className="text-sm text-quaternary max-w-[220px] break-words">
                  {subHeading}
                </p>
              )}
            </div>

            {/* Menu */}
            <nav className="flex flex-col justify-start gap-2">
              <h4 className="text-md font-semibold text-quaternary mb-2">Menu</h4>
              <ul className="flex flex-col gap-2">
                {footerLinksCollection?.items.length ? (
                  footerLinksCollection.items.map(link => (
                    <li key={link.label}>
                      <Button color="link-gray" size="sm" href={link.href} as="a">
                        {link.label}
                      </Button>
                    </li>
                  ))
                ) : (
                  <li className="text-quaternary text-sm">No hay links disponibles</li>
                )}
              </ul>
            </nav>

            {/* Contact + Redes sociales */}
            <div className="flex flex-col justify-start gap-3">
              {contactCollection.length > 0 && (
                <>
                  <h4 className="text-md font-semibold text-quaternary mb-2">Información de contacto</h4>
                  <ul className="flex flex-col gap-1 text-sm text-quaternary">
                    {contactCollection.map(contact => {
                      const icon = contactIconsMap[contact.icon];
                      return (
                        <li key={contact.label} className="flex items-center gap-2">
                          {icon && <FontAwesomeIcon icon={icon} />}
                          <span>{contact.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {/* Redes sociales debajo del contacto */}
              {safeSocialLinks.length > 0 && (
                <div className="flex gap-4 mt-2">
                  {safeSocialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <FontAwesomeIcon icon={link.Icon} size="lg" aria-label={link.label} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer inferior */}
      <div
        className="py-10 md:py-12"
        style={{ backgroundColor: 'rgb(7, 78, 140)' }} // Fondo azul
      >
        <div className="mx-auto max-w-container px-4 md:px-8 flex justify-between items-center">
          <span className="text-white text-md">
            © {currentYear}&nbsp;&nbsp;All rights reserved.
          </span>
          <span className="flex items-center gap-2 font-mono text-white px-2 py-0.5 rounded-sm transition-colors">
            💻 Dev. Abraham Durán
            <a
              href="https://www.linkedin.com/in/abrahamduraan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Abraham Durán"
              className="ml-2"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
