import { createContext, ReactNode, useContext } from "react";
import { CLIENT_ID } from "../config";
import { LoginData } from "../types/auth";
import { client } from "../utils/client";
import { useLocalStorage } from "./useLocalStorage";

const TOKEN_KEY = "supermetrics_assignment_token";

type AuthContextType = {
  token: string;
  login: (data: LoginData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage<string>(TOKEN_KEY);

  const login = (data: LoginData) => {
    client("register", { body: { client_id: CLIENT_ID, ...data } }).then(
      (res) => {
        const token = res?.data?.sl_token;

        if (token) {
          setToken(token);
        }

        return res;
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  };

  const logout = () => {
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
