import { ChangeEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sortPostsByTime, usePosts } from "../../hooks/usePosts";

const orders = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
};

export const Posts = () => {
  const [order, setOrder] = useState(orders.LATEST);
  const { logout } = useAuth();
  const [postsBySenders] = usePosts();

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
    setOrder(event.target.value);
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={logout}>Logout</button>
      <select
        title="Order by"
        onChange={handleOrderChange}
        defaultValue={order}
      >
        <option value={orders.LATEST}>Order by: Latest</option>
        <option value={orders.OLDEST}>Order by: Oldest</option>
      </select>
      {postsBySenders?.length ? (
        <ol>
          {postsBySenders.map(([sender_id, { name, posts }]) => (
            <li key={sender_id}>
              <details>
                <summary>
                  <strong>{name}</strong> ({posts.length})
                </summary>
                <ul>
                  {sortPostsByTime(posts, order).map(
                    ({ id, message, created_time }) => (
                      <li key={id}>
                        <small>
                          <time dateTime={created_time}>{created_time}</time>
                        </small>
                        <p>{message}</p>
                      </li>
                    )
                  )}
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
