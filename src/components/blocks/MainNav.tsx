import Link from 'next/link';
import { Header } from "@/components/marketing/header-navigation/header";
import { getMainNavigation } from '@/lib/contentful';

export default async function MainNav() {
  const { logo, items } = await getMainNavigation('main-nav');

  if (!items.length && !logo) return null;

  return (
    <nav className="main-nav">
      <div className="main-nav__inner">
        {logo && (
            <img src={logo.url} alt={logo.title} />
        )}

        <ul className="main-nav__list">
          {items.map((item) => (
            <li key={item.link} className="main-nav__item">
              <Link href={item.link} className="main-nav__link">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
