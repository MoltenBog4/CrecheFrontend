import styles from './SignUp.module.css';
export default function SignUp() {
  return (
    <main className={styles.main}>
      <h1>Sign up</h1>
      <form className={styles.form}>
        <label>Name <input required /></label>
        <label>Email <input type="email" required /></label>
        <label>Password <input type="password" required /></label>
        <button>Create account</button>
      </form>
    </main>
  );
}
