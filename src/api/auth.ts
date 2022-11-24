import { CLIENT_ID } from '../config';
import { LoginData } from "../types/auth";
import { client } from '../utils/client';

export function login(data: LoginData) {
  return client('register', { body: { client_id: CLIENT_ID, ...data } }).then(
    (res) => {
      const token = res?.data?.sl_token

      if (token) {
        console.log("Authenticated token", res.data.sl_token);
      }

      return res
    },
    (error) => {
      console.error("Login failed", error);
    }
  );
}