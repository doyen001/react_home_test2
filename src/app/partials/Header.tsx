import Image from "next/image";
import commonStyles from "./Common.module.css";
import styles from "./Header.module.css";

import Flex from "@/app/containers/Flex";

interface LittleLogoInterface {
  className?: string;
}

function LittleLogo({ className = "" }: LittleLogoInterface) {
  return (
    <Image
      src="../icon.svg" // Replace with the correct path to your logo
      className={`${styles.littleLogo} ${className}`}
      alt="Logo"
      width={40}
      height={40}
    />
  );
}

function SmallScreenHeader() {
  return (
    <header className={`${commonStyles.smallScreen} ${styles.header}`}>
      {/* Left side */}
      <Flex direction="row" justify="flex-start" gap={10}>
        <LittleLogo className={commonStyles.hideBelowWidth700} />
      </Flex>
    </header>
  );
}

function LargeScreenHeader() {
  return (
    <header className={`${commonStyles.largeScreen} ${styles.header}`}>
      <Flex direction="row" justify="flex-start" gap={10}>
        <LittleLogo />
      </Flex>
    </header>
  );
}

export default function Header() {
  return (
    <>
      <SmallScreenHeader />
      <LargeScreenHeader />
    </>
  );
}
