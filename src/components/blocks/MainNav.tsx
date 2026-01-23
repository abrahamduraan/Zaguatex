import { getMainNavigation } from '@/lib/contentful';
import MainNavEdit from './MainNavEdit';

export default async function MainNav() {
  const { logo, items } = await getMainNavigation('main-nav');

  if (!items.length && !logo) return null;

  return <MainNavEdit items={items} logo={logo} />;
}
