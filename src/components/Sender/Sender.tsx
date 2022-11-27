import styles from "./Sender.module.css";

type Props = {
  name: string;
  count: number;
  children: React.ReactNode;
};

export const Sender = ({ name, count, children }: Props) => {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <strong>{name}</strong> ({count})
      </summary>
      {children}
    </details>
  );
};
