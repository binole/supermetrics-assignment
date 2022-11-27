import styles from "./Post.module.css";

type Props = {
  time: string;
  message: string;
};

export const Post = ({ time, message }: Props) => {
  return (
    <div className={styles.post}>
      <small>
        <time dateTime={time}>{new Date(time).toLocaleString()}</time>
      </small>
      <p>{message}</p>
    </div>
  );
};
