import { Header } from "@/components/marketing/header-navigation/header";
import { getMainNavigation } from '@/lib/contentful';

export default async function MainNav() {
  const { logo, items } = await getMainNavigation('main-nav');
  console.log(logo);

  const headerItems = items.map((item) => ({
    label: item.text,
    href: item.link,
  }));

  if (!items.length && !logo) return null;

  return (
    <Header items={headerItems} logoUrl={logo.url} logoAlt={logo.title} className="sticky top-0 z-50"/>
  );
}
