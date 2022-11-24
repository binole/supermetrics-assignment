import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { LoginData } from "../../types/auth";
import styles from "./Login.module.css";

export const Login = () => {
  const { handleSubmit } = useForm<LoginData>();
  const { login } = useAuth();

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" name="email" required />
          </div>
          <Button type="submit">Go</Button>
        </form>
      </div>
    </div>
  );
};
