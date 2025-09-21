import styles from './Login.module.css';
export default function Login() {
  return (
    <main className={styles.main}>
      <h1>Log in</h1>
      <form className={styles.form}>
        <label>Email <input type="email" required /></label>
        <label>Password <input type="password" required /></label>
        <button>Log in</button>
      </form>
    </main>
  );
}
