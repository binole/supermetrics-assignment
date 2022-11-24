import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

export const Posts = () => {
  const { logout } = useAuth();
  const [posts] = usePosts();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logout}>Logout</button>
      {posts?.length ? (
        <ol>
          {posts.map(({ id, from_name, message, created_time }) => (
            <li key={id}>
              <p>
                <strong>{from_name}</strong>: {message}
              </p>
              <p>
                <small>
                  <time dateTime={created_time}>{created_time}</time>
                </small>
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
