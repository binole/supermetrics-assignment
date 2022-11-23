import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import styles from "./Login.module.css";

type LoginFormData = {
  name: string;
  email: string;
};

export const Login = () => {
  const { handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
