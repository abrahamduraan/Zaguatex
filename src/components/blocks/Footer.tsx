'use client';

import { Button } from "@/components/base/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faWhatsapp, faTiktok } from "@fortawesome/free-brands-svg-icons";

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
      <div className="bg-primary py-12 md:py-16">
        <div className="mx-auto max-w-container px-4 md:px-8 flex flex-col md:flex-row justify-between gap-12 md:gap-16">
          
          {/* IZQUIERDA: Logo + Heading + Subheading + Social Links */}
          <div className="flex flex-col gap-4 md:w-1/2">
            {logoImage && (
              <img
                src={logoImage.url}
                alt={logoImage.title || "Logo"}
                className="h-10 w-min shrink-0"
              />
            )}
            {heading && <p className="text-md text-tertiary font-semibold">{heading}</p>}
            {subHeading && <p className="text-sm text-quaternary">{subHeading}</p>}

            {safeSocialLinks.length > 0 && (
              <ul className="flex gap-4 mt-2">
                {safeSocialLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <FontAwesomeIcon icon={link.Icon} size="lg" aria-label={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DERECHA: Menu + Contact */}
          <div className="flex-1 md:w-1/2 flex flex-col md:flex-row gap-8">
            {/* Menu */}
            <nav className="flex-1">
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

            {/* Contacto */}
            {contactCollection.length > 0 && (
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-quaternary mb-4">Información de contacto</h4>
                <ul className="flex flex-col gap-2 text-sm text-quaternary">
                  {contactCollection.map(contact => {
                    let icon;
                    switch (contact.icon) {
                      case "Location":
                        icon = "📍";
                        break;
                      case "Number":
                        icon = "📞";
                        break;
                      case "Email":
                        icon = "✉️";
                        break;
                      default:
                        icon = "";
                    }
                    return (
                      <li key={contact.label} className="flex items-center gap-2">
                        <span>{icon}</span>
                        <span>{contact.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="bg-secondary_alt py-10 md:py-12">
        <div className="mx-auto max-w-container px-4 md:px-8 flex justify-between items-center">
          <span className="text-quaternary text-md">
            © {currentYear}&nbsp;&nbsp;All rights reserved.
          </span>
          <span className="flex items-center gap-1 font-mono text-accent px-2 py-0.5 rounded-sm bg-accent/10 hover:bg-accent/20 transition-colors">
            💻 Dev. Abraham Durán
            <a
              href="https://www.linkedin.com/in/abrahamduraan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Abraham Durán"
              className="ml-1"
            >
              <img
                src="https://static.platzi.com/media/user_upload/logotipo%20LinkedIn-48a7203f-e808-4c04-80d5-1cc2f9ceffff.jpg"
                alt="LinkedIn Abraham Durán"
                className="h-6 w-auto inline-block"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
