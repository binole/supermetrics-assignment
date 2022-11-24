import { useAuth } from "../../hooks/useAuth";

export const Posts = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
