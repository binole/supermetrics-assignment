import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import { client } from '../utils/client';
import { useAuth } from './useAuth';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      client("posts", { params: { sl_token: token, page: '1' } }).then(
        (res) => {
          if (res?.data?.posts) {
            setPosts(res.data.posts)
          }
        },
      );
    }
  }, [token])

  return [posts]
}
