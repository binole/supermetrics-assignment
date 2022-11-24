import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import { client } from '../utils/client';
import { groupBy } from '../utils/groupBy';
import { useAuth } from './useAuth';

export const usePosts = () => {
  const [data, setData] = useState<[string, Post[]][] | null>(null);
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      client("posts", { params: { sl_token: token, page: '1' } }).then(
        (res) => {
          if (res?.data?.posts) {
            const postsBySenders = Object.entries(groupBy(res.data.posts, (p: Post) => p.from_id))

            setData(postsBySenders)
          }
        },
      );
    }
  }, [token])

  return [data]
}
