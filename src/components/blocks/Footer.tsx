import { Button } from "@/components/base/buttons/button";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { AngelList, Dribbble, Facebook, GitHub, LinkedIn, X } from "@/components/foundations/social-icons";

type FooterProps = {
  heading?: string | null;
  subHeading?: string | null;
  logoImage?: { url: string; title: string } | null;
  footerLinks?: { label: string; href: string }[]; // links para la columna Menu
  socialLinks?: { label: string; href: string }[]; // links para las redes sociales
};

const Footer = ({ heading, subHeading, logoImage, footerLinks = [], socialLinks = [] }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialIconsMap: Record<string, any> = {
    Twitter: X,
    LinkedIn: LinkedIn,
    Facebook: Facebook,
    GitHub: GitHub,
    AngelList: AngelList,
    Dribbble: Dribbble,
  };

  const safeFooterLinks = footerLinks.map((link) => ({
    label: link.label || "",
    href: link.href || "#",
  }));

  const safeSocialLinks = socialLinks.map((link) => ({
    label: link.label || "",
    href: link.href || "#",
  }));

  return (
    <footer>
      {/* Sección principal */}
      <div className="bg-primary py-12 md:pt-16">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
            {/* Contenido izquierdo */}
            <div className="flex flex-col items-start gap-6 md:w-1/2">
              {logoImage && <UntitledLogo className="h-8 w-min shrink-0" />}
              {heading && <p className="text-md text-tertiary">{heading}</p>}
              {subHeading && <p className="text-sm text-quaternary">{subHeading}</p>}
            </div>

            {/* Columna de Menu derecha */}
            <nav className="flex-1 md:w-1/3">
              <h4 className="text-sm font-semibold text-quaternary mb-4">Menu</h4>
              <ul className="flex flex-col gap-3">
                {safeFooterLinks.length > 0 ? (
                  safeFooterLinks.map((link) => (
                    <li key={link.label}>
                      <Button color="link-gray" size="lg" href={link.href}>
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
              © {currentYear} Untitled UI. All rights reserved.
            </p>

            {safeSocialLinks.length > 0 && (
              <ul className="flex gap-6">
                {safeSocialLinks.map(({ label, href }) => {
                  const Icon = socialIconsMap[label];
                  if (!Icon) return null;
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex rounded-xs text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <Icon size={24} aria-label={label} />
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
