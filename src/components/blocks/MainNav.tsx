// src/components/blocks/MainNav.tsx
import MainNavEdit from './MainNavEdit';
import { getMainNavigation, NavItem, NavLogo as NavLogoFromContentful } from '@/lib/contentful';

interface MainNavWrapperProps {
  slug?: string;
}

// Normalizamos la descripción para que nunca sea null
function normalizeLogo(logo?: NavLogoFromContentful | null) {
  if (!logo) return undefined;
  return {
    url: logo.url,
    title: logo.title,
    description: logo.description ?? undefined, // <-- null a undefined
  };
}

export default async function MainNavWrapper({ slug = 'main-nav' }: MainNavWrapperProps) {
  const { logo, items } = await getMainNavigation(slug);

  if ((!items || !items.length) && !logo) return null;

  return <MainNavEdit items={items} logo={normalizeLogo(logo)} />;
}
