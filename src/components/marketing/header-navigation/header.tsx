'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState, ReactNode } from 'react';
import { ChevronDown } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { DropdownMenuSimple } from '@/components/marketing/header-navigation/dropdown-header-navigation';
import { cx } from '@/utils/cx';
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from 'react-aria-components';

// -----------------------------
// Tipos
// -----------------------------
export type HeaderNavItem = {
  label: string | ReactNode | null; // ahora puede ser JSX
  href?: string;
  menu?: ReactNode;
};

// -----------------------------
// Items de ejemplo
// -----------------------------
const headerNavItems: HeaderNavItem[] = [
  { label: 'Products', href: '/products', menu: <DropdownMenuSimple /> },
  { label: 'Services', href: '/services', menu: <DropdownMenuSimple /> },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources', menu: <DropdownMenuSimple /> },
  { label: 'About', href: '/about' },
];

const footerNavItems = [
  { label: 'About us', href: '/' },
  { label: 'Press', href: '/products' },
  { label: 'Careers', href: '/resources' },
  { label: 'Legal', href: '/ss' },
  { label: 'Support', href: '/sss' },
  { label: 'Contact', href: '/sss' },
  { label: 'Sitemap', href: '/ssss' },
  { label: 'Cookie settings', href: '/sssss' },
];

// -----------------------------
// Componente para mobile nav
// -----------------------------
const MobileNavItem = ({
  className,
  label,
  href,
  children,
}: {
  className?: string;
  label: string | ReactNode;
  href?: string;
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (href) {
    return (
      <li>
        <Link
          href={href}
          className="flex items-center justify-between px-4 py-3 text-md font-semibold text-[var(--color-gray)] hover:bg-[var(--color-blue)] hover:text-[var(--color-white)]"
        >
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-0.5">
      <button
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-md font-semibold text-[var(--color-gray)] hover:bg-[var(--color-blue)] hover:text-[var(--color-white)]"
      >
        {label}{' '}
        <ChevronDown
          className={cx(
            'size-4 stroke-[var(--color-dark-gray)] transition duration-100 ease-linear',
            isOpen ? '-rotate-180' : 'rotate-0'
          )}
        />
      </button>
      {isOpen && <div>{children}</div>}
    </li>
  );
};

// -----------------------------
// Footer mobile
// -----------------------------
const MobileFooter = () => {
  return (
    <div className="flex flex-col gap-8 border-t border-secondary px-4 py-6">
      <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-3">
        {footerNavItems.map((navItem) => (
          <li key={navItem.label}>
            <Link href={navItem.href}>
              <Button color="link-gray" size="lg">
                {navItem.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        <Button size="lg">Sign up</Button>
        <Button color="secondary" size="lg">
          {/* espacio para otro botón si quieres */}
        </Button>
      </div>
    </div>
  );
};

// -----------------------------
// Header principal
// -----------------------------
interface HeaderProps {
  items?: HeaderNavItem[];
  isFullWidth?: boolean;
  isFloating?: boolean;
  className?: string;
  logoUrl?: string;
  logoAlt?: string;
  renderLogo?: () => ReactNode;
}

export const Header = ({
  items = headerNavItems,
  isFullWidth,
  isFloating,
  className,
  logoUrl,
  logoAlt,
  renderLogo,
}: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header
      ref={headerRef}
      className={cx(
        'relative flex h-18 w-full items-center justify-center md:h-20',
        isFloating && 'h-16 md:h-19 md:pt-3',
        className
      )}
    >
      <div className="flex w-full max-w-container flex-1 items-center px-4 md:px-8">
        <div
          className={cx(
            'flex w-full justify-between gap-4',
            isFloating &&
              'ring-secondary_alt md:rounded-2xl md:bg-white md:py-3 md:pr-3 md:pl-4 md:shadow-xs md:ring-1'
          )}
        >
          <div className="flex flex-1 items-center gap-5">
            {/* Logo */}
            {logoUrl && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="cursor-pointer"
              >
                <Link href="/">
                  <img src={logoUrl} alt={logoAlt || 'Logo'} className="h-10 w-auto" />
                </Link>
              </motion.div>
            )}

            {/* Desktop navigation */}
            <nav className="max-md:hidden">
                <ul className="flex items-center gap-0.5">
              {items.map((navItem) => {
                const isActive = navItem.href === pathname;

                return (
                  <li key={navItem.label?.toString() || 'nav-item'} className="relative">
                      {navItem.menu ? (
                        <AriaDialogTrigger>
                          <AriaButton className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-[var(--color-dark-gray)] outline-focus-ring transition duration-100 ease-linear hover:text-[var(--color-blue)] focus-visible:outline-2 focus-visible:outline-offset-2">
                            <span className="px-0.5">{navItem.label}</span>
                            <ChevronDown className="size-4 stroke-[var(--color-dark-gray)] transition duration-100 ease-linear in-aria-expanded:-rotate-180" />
                          </AriaButton>
                          <AriaPopover>
                            <AriaDialog>{navItem.menu}</AriaDialog>
                          </AriaPopover>
                        </AriaDialogTrigger>
                      ) : (
                        <Link
                          href={navItem.href!}
                          className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-[var(--color-dark-gray)] transition duration-100 ease-linear hover:text-[var(--color-yellow)] focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <span className="px-0.5 relative inline-block">
                            {navItem.label}
                            {/* Underline animado solo en activo */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.span
                                  key="active-underline"
                                  initial={{ scaleX: 0, opacity: 0 }}
                                  animate={{ scaleX: 1, opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeOut' }}
                                  className="absolute left-0 -bottom-1 h-[3px] w-full origin-center"
                                  style={{ backgroundColor: 'var(--color-yellow)' }}
                                />
                              )}
                            </AnimatePresence>
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Botón Donar */}
          <Button
            color="orange"
            size={isFloating ? 'md' : 'lg'}
            onClick={() => router.push('/donar')}
          >
            Donar
          </Button>

          {/* Mobile menu */}
          <AriaDialogTrigger>
            <AriaButton
              aria-label="Toggle navigation menu"
              className="group ml-auto cursor-pointer rounded-lg p-2 md:hidden"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  className="hidden group-aria-expanded:block text-[var(--color-dark-gray)]"
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="text-[var(--color-dark-gray)] group-aria-expanded:hidden"
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </AriaButton>

            <AriaPopover
              triggerRef={headerRef}
              className="fixed top-0 right-0 h-full w-1/2 bg-[var(--color-white)] shadow-lg overflow-y-auto md:hidden"
              offset={0}
              crossOffset={0}
              containerPadding={0}
              placement="bottom right"
            >
              <AriaDialog className="outline-hidden w-full h-full">
                <nav className="w-full h-full flex flex-col">
                  <ul className="flex flex-col divide-y divide-gray-300 py-5 px-4">
                    {items.map((navItem) =>
                      navItem.menu ? (
                        <li key={navItem.label?.toString() || 'nav-item'} className="pb-2">
                          <MobileNavItem label={navItem.label}>{navItem.menu}</MobileNavItem>
                        </li>
                      ) : (
                        <li key={navItem.label?.toString() || 'nav-item'} className="pb-2">
                          <MobileNavItem label={navItem.label} href={navItem.href} />
                        </li>
                      )
                    )}

                    {/* Botón Donar */}
                    <li className="pt-4">
                      <Button
                        color="orange"
                        size={isFloating ? 'md' : 'lg'}
                        onClick={() => router.push('/donar')}
                      >
                        Donar
                      </Button>
                    </li>
                  </ul>
                  <MobileFooter />
                </nav>
              </AriaDialog>
            </AriaPopover>
          </AriaDialogTrigger>
        </div>
      </div>
    </header>
  );
};
