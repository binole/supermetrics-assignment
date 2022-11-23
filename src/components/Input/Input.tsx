import { HTMLProps } from "react";
import styles from "./Input.module.css";

type Props = HTMLProps<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input className={styles.input} {...props} />;
};
