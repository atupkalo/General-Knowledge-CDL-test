import styles from "./page.module.css";
import Test from "./components/Test/Test"


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Test />
      </main>
    </div>
  );
}
