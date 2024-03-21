import styles from "./searchbaricon.module.css";
import SearchIcon from "@mui/icons-material/Search";


interface SearchBarIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SearchBarIcon({ className, style }: SearchBarIconProps) {
    // IMPORTANT: keep the icon size styles in-line. Otherwise, the icon will be
    // weirdly resized on load with the size styles sometimes not being applied.
  return (
    <SearchIcon className={styles.searchIcon} style={style}></SearchIcon>
  );
}
