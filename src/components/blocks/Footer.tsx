'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/base/buttons/button";

// Importar directamente todos los iconos que vamos a usar
import { faMapMarkerAlt, faPhone, faEnvelope, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faTiktok, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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

  // Map de iconos de redes sociales
  const socialIconsMap: Record<string, any> = {
    facebook: faFacebookF,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    tiktok: faTiktok,
    linkedin: faLinkedin,
  };

  // Map de iconos de contacto
  const contactIconsMap: Record<string, any> = {
    Location: faMapMarkerAlt,
    Number: faPhone,
    Email: faEnvelope,
  };

  // Filtra y asigna iconos seguros a redes sociales
  const safeSocialLinks = socialLinks
    .map(link => {
      const key = link.label.trim().toLowerCase();
      const icon = socialIconsMap[key];
      if (!icon) return null;
      return { ...link, icon };
    })
    .filter(Boolean) as (typeof socialLinks[0] & { icon: any })[];

  return (
    <footer>
      {/* Sección principal */}
      <div className="py-12 md:py-16 bg-gray-100">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">

            {/* Logo */}
            <div className="flex flex-col items-center md:items-start">
              {logoImage && (
                <img
                  src={logoImage.url}
                  alt={logoImage.title || "Logo"}
                  className="h-16 w-auto mb-2"
                />
              )}
            </div>

            {/* Heading + Subheading */}
            <div className="flex flex-col items-center md:items-start">
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
            <nav className="flex flex-col items-center md:items-start gap-2">
              <h4 className="text-md font-semibold text-quaternary mb-2">Menu</h4>
              <ul className="flex flex-col gap-2">
                {footerLinksCollection?.items.length ? (
                  footerLinksCollection.items.map(link => (
                    <li key={link.label}>
                      <Button color="link-gray" size="sm" href={link.href}>{link.label}</Button>
                    </li>
                  ))
                ) : (
                  <li className="text-quaternary text-sm">No hay links disponibles</li>
                )}
              </ul>
            </nav>

            {/* Contacto + Redes Sociales */}
            <div className="flex flex-col items-center md:items-start gap-3">
              {contactCollection.length > 0 && (
                <>
                  <h4 className="text-md font-semibold text-quaternary mb-2">Información de contacto</h4>
                  <ul className="flex flex-col gap-1 text-sm text-quaternary">
                    {contactCollection.map(contact => {
                      const icon = contactIconsMap[contact.icon];
                      return (
                        <li key={contact.label} className="flex items-center gap-2 justify-center md:justify-start">
                          {icon && <FontAwesomeIcon icon={icon} style={{ width: "1rem", height: "1rem" }} />}
                          <span>{contact.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {/* Redes sociales */}
              {safeSocialLinks.length > 0 && (
                <div className="flex gap-4 mt-2 justify-center md:justify-start">
                  {safeSocialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <FontAwesomeIcon icon={link.icon} style={{ width: "1rem", height: "1rem" }} />
                    </a>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="py-10 md:py-12 bg-blue-900">
        <div className="mx-auto max-w-container px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0 text-center md:text-left">
          <span className="text-white text-md">© {currentYear}&nbsp;&nbsp;All rights reserved.</span>
          <span className="flex items-center gap-2 font-mono text-white px-2 py-0.5 rounded-sm transition-colors justify-center">
            <FontAwesomeIcon icon={faLaptopCode} style={{ width: "1rem", height: "1rem" }} /> Dev. Abraham Durán
            <a
              href="https://www.linkedin.com/in/abrahamduraan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Abraham Durán"
              className="ml-2"
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ width: "1rem", height: "1rem" }} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
