import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ onOpenSubscribe }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>   Little Einsteins</NavLink>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? styles.active : undefined}>About Us</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? styles.active : undefined}>Services</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? styles.active : undefined}>Contact Us</NavLink>
        </nav>

        <div className={styles.auth}>
          <button type="button" className={styles.ghost} onClick={onOpenSubscribe}>Subscribe</button>
          <NavLink to="/login" className={styles.linkBtn}>Log in</NavLink>
          <NavLink to="/signup" className={styles.primaryBtn}>Sign up</NavLink>
        </div>
      </div>
    </header>
  );
}
