
import { API_URL } from '../config';

type RequestConfig = Omit<RequestInit, 'body'> & {
  body?: Object
}

export function client(endpoint: string, { body, headers, ...customConfig }: RequestConfig) {
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined
  }

  return window
    .fetch(`${API_URL}/assignment/${endpoint}`, config)
    .then(async response => {
      if (response.ok) {
        return await response.json();
      } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    })
}