
import { API_URL } from '../config';
import { storage } from './storage';

const statusCodes = {
  UNAUTHORIZED: 401
}

type RequestConfig = Omit<RequestInit, 'body'> & {
  body?: Object;
  params?: [string, string][] | { [key: string]: string } | string
}

export function client(endpoint: string, { body, headers, params, ...customConfig }: RequestConfig) {
  const url = `${API_URL}/assignment/${endpoint}`
  const fullUrl = params ? url + '?' + new URLSearchParams(params) : url

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
    .fetch(fullUrl, config)
    .then(async response => {
      if (response.ok) {
        return await response.json();
      } else {
        if (response.status === statusCodes.UNAUTHORIZED) {
          storage.clearItem('token')
        }

        const errorMessage = await response.text()

        return Promise.reject(new Error(errorMessage))
      }
    })
}