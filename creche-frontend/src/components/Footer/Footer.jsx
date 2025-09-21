import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandBlock}>
          <div className={styles.logoRow}>
            <div className={styles.logo} aria-hidden="true">🌳</div>
            <div className={styles.brand}>
              <strong>Little Gems</strong>
              <span>Driven by excellence, motivated by love</span>
            </div>
          </div>
          <p className={styles.desc}>
            We’re committed to exceptional care and joyful early learning—helping children build independence,
            health and self-esteem in a nurturing environment.
          </p>
        </div>

        <nav className={styles.links}>
          <div>
            <h4>Services</h4>
            <ul>
              <li><NavLink to="/services">Learning Center</NavLink></li>
              <li><NavLink to="/services">Day Care Program</NavLink></li>
              <li><NavLink to="/services">After-Care</NavLink></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><NavLink to="/about">Our Story</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul className={styles.social}>
              <li><a href="#" aria-label="Facebook">f</a></li>
              <li><a href="#" aria-label="Twitter">t</a></li>
              <li><a href="#" aria-label="Instagram">i</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Milo’s House</span>
        <ul className={styles.bottomLinks}>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </footer>
  );
}
