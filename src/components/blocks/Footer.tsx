'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";

import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faTiktok,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

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
  const router = useRouter();

  const socialIconsMap: Record<string, any> = {
    facebook: faFacebookF,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    tiktok: faTiktok,
    linkedin: faLinkedin,
  };

  const contactIconsMap: Record<string, any> = {
    Location: faMapMarkerAlt,
    Number: faPhone,
    Email: faEnvelope,
  };

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

            {/* Heading */}
            <div className="flex flex-col items-center md:items-start">
              {heading && (
                <p
                  className="text-lg font-semibold mb-1 max-w-[200px] break-words"
                  style={{ color: "var(--color-dark-blue)" }} // gris oscuro
                >
                  {heading}
                </p>
              )}
              {subHeading && (
                <p
                  className="text-sm max-w-[220px] break-words"
                  style={{ color: "var(--color-gray)" }} // gris normal
                >
                  {subHeading}
                </p>
              )}
            </div>

            {/* Menu */}
            <nav className="flex flex-col items-center md:items-start gap-2">
              <h4
                className="text-md font-semibold mb-2"
                style={{ color: "var(--color-dark-gray)" }} // gris oscuro
              >
                Menu
              </h4>
              <ul className="flex flex-col gap-2">
                {footerLinksCollection?.items.length ? (
                  footerLinksCollection.items.map(link => (
                    <li key={link.label}>
                      <Button
                        color="link-gray"
                        size="sm"
                        onClick={() => router.push(link.href)}
                        className="text-quaternary"
                      >
                        {link.label}
                      </Button>
                    </li>
                  ))
                ) : (
                  <li
                    className="text-sm"
                    style={{ color: "var(--color-gray)" }}
                  >
                    No hay links disponibles
                  </li>
                )}
              </ul>
            </nav>

            {/* Contacto + Redes */}
            <div className="flex flex-col items-center md:items-start gap-3">
              {contactCollection.length > 0 && (
                <>
                  <h4
                    className="text-md font-semibold mb-2"
                    style={{ color: "var(--color-dark-gray)" }} // gris oscuro
                  >
                    Información de contacto
                  </h4>

                  <ul className="flex flex-col gap-1 text-sm">
                    {contactCollection.map(contact => {
                      const icon = contactIconsMap[contact.icon];
                      return (
                        <li
                          key={contact.label}
                          className="flex items-center gap-2 justify-center md:justify-start"
                          style={{ color: "var(--color-gray)" }} // gris normal
                        >
                          {icon && (
                            <FontAwesomeIcon
                              icon={icon}
                              style={{
                                width: "1rem",
                                height: "1rem",
                                color: "var(--color-yellow)", // amarillo
                              }}
                            />
                          )}
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
                      className="transition duration-100"
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        style={{
                          width: "1rem",
                          height: "1rem",
                          color: "var(--color-gray)", // amarillo
                        }}
                      />
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
        style={{ backgroundColor: "var(--color-blue)" }} // azul de fondo
      >
        <div className="mx-auto max-w-container px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
          <span
            className="text-md"
            style={{ color: "white" }}
          >
            © {currentYear} All rights reserved.
          </span>

          <span className="flex items-center gap-2 font-mono" style={{ color: "white" }}>
            <FontAwesomeIcon icon={faLaptopCode} style={{ color: "var(--color-white)" }} />
            Dev. Abraham Durán
            <a
              href="https://www.linkedin.com/in/abrahamduraan/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ color: "var(--color-white)" }} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
