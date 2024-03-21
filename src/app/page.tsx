"use client";

import styles from "./page.module.css";
import Header from "./partials/Header";
import Content from "./partials/Content";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Content />
    </main>
  );
}
