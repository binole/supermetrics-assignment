import { ChangeEvent, useState } from "react";
import { Header } from "../../components/Header";
import { Post } from "../../components/Post";
import { Sender } from "../../components/Sender";
import {
  filterSendersByName,
  sortPostsByTime,
  usePosts,
} from "../../hooks/usePosts";
import styles from "./Posts.module.css";

const orders = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
};

export const Posts = () => {
  const [senderQuery, setSenderQuery] = useState("");
  const [order, setOrder] = useState(orders.LATEST);
  const [postsBySenders] = usePosts();

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
    setOrder(event.target.value);
  }

  function handleSenderQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setSenderQuery(event.target.value);
  }

  return (
    <div className={styles.container}>
      <Header title="All Posts" />
      <div className={styles.searchBox}>
        <input
          type="search"
          placeholder="Search by sender"
          value={senderQuery}
          onChange={handleSenderQueryChange}
        />
        <select
          title="Order by"
          onChange={handleOrderChange}
          defaultValue={order}
        >
          <option value={orders.LATEST}>Order by: Latest</option>
          <option value={orders.OLDEST}>Order by: Oldest</option>
        </select>
      </div>
      {postsBySenders?.length ? (
        <ol>
          {filterSendersByName(postsBySenders, senderQuery).map(
            ([sender_id, { name, posts }]) => (
              <li key={sender_id}>
                <Sender name={name} count={posts.length}>
                  <ul>
                    {sortPostsByTime(posts, order).map(
                      ({ id, message, created_time }) => (
                        <li key={id}>
                          <Post time={created_time} message={message} />
                        </li>
                      )
                    )}
                  </ul>
                </Sender>
              </li>
            )
          )}
        </ol>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
