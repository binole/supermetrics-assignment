import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";

export const Posts = () => {
  const { logout } = useAuth();
  const [postsBySenders] = usePosts();

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logout}>Logout</button>
      {postsBySenders?.length ? (
        <ol>
          {postsBySenders.map(([sender_id, { name, posts }]) => (
            <li key={sender_id}>
              <details>
                <summary>
                  <strong>{name}</strong> ({posts.length})
                </summary>
                <ul>
                  {posts.map(({ id, message, created_time }) => (
                    <li key={id}>
                      <small>
                        <time dateTime={created_time}>{created_time}</time>
                      </small>
                      <p>{message}</p>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
