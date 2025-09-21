import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css';
export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <h1>404</h1>
        <p>We couldn’t find that page.</p>
        <NavLink to="/" className={styles.btn}>Back Home</NavLink>
      </div>
    </main>
  );
}
