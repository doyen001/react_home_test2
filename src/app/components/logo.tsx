import Link from "next/link";
import styles from "./logo.module.css";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({ className, style = {} }: LogoProps) {
  return (
    <h1 className={`${styles.logo} ${className}`} style={style}>
      <Link href={"/"}>MediSearch</Link>
    </h1>
  );
}
