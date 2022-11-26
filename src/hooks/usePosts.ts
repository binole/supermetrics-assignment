import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import { client } from '../utils/client';
import { useAuth } from './useAuth';

type Sender = {
  name: string;
  posts: Post[];
}

export const usePosts = () => {
  const [data, setData] = useState<[string, Sender][] | null>(null);
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      client("posts", { params: { sl_token: token, page: '1' } }).then(
        (res) => {
          if (res?.data?.posts) {
            setData(sortByName(groupPostsBySenders(res.data.posts)))
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

function sortByName(senders: [string, Sender][]) {
  return senders.sort(([, currSender], [, nextSender]) => {
    if (currSender.name < nextSender.name) {
      return -1
    }

    if (currSender.name > nextSender.name) {
      return 1
    }

    return 0
  })
}
