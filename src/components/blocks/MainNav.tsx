import MainNavEdit from './MainNavEdit';
import { getMainNavigation } from '@/lib/contentful';

export default async function MainNavWrapper() {
  const { logo, items } = await getMainNavigation('main-nav');

  if ((!items || !items.length) && !logo) return null;

  return <MainNavEdit items={items} logo={logo ?? undefined} />;
}