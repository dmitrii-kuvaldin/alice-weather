import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';

export default function Header() {
  const location = useLocation();

  interface ILink {
    path: string,
    label: string;
  }

  const navItems: ILink[] = [
    { path: '/', label: 'Home' },
    { path: '/weathers', label: 'Weathers' }

  ];

  return (
    <header className={styles.header}>

      <h1 className={styles.weatherApp}>Weather App</h1>
      {navItems.map((item, index) => (
        <Link
          key={index}
          className={location.pathname === item.path ? styles.active : styles.normalLink}
          to={item.path}>{item.label}</Link>
      ))}
    </header>
  );
}
