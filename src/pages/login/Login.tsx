import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        <form className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" required />
          </div>
          <Button type="submit">Go</Button>
        </form>
      </div>
    </div>
  );
};
