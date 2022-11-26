import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import { client } from '../utils/client';
import { useAuth } from './useAuth';

export const usePosts = () => {
  const [data, setData] = useState<[string, { name: string, posts: Post[] }][] | null>(null);
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      client("posts", { params: { sl_token: token, page: '1' } }).then(
        (res) => {
          if (res?.data?.posts) {
            setData(groupPostsBySenders(res.data.posts))
          }
        },
      );
    }
  }, [token])

  return [data]
}

function groupPostsBySenders(posts: Post[]) {
  return Object.entries(posts.reduce((senders: Record<string, any>, post: Post) => {
    return {
      ...senders,
      [post.from_id]: {
        ...senders[post.from_id],
        name: post.from_name,
        posts: [...senders[post.from_id]?.posts ?? [], post]
      }
    }
  }, {}))
}
