import { useAuth } from "../../hooks/useAuth";
import styles from "./Header.module.css";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};
