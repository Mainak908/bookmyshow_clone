"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
interface icontext {
  loggedIn: boolean;
  checkLoginState: () => Promise<void>;
  user: any;
  seatCount: number;
  setSeatCount: Dispatch<SetStateAction<number>>;
}
export const AuthContext = createContext<icontext | null>(null);

axios.interceptors.response.use(
  async (resp) => {
    if (resp.data.loggedIn === false) {
      const response = await axios.post(
        "http://localhost:3001/api/v1/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "access token refreshed") {
        return axios(resp.config);
      }
      if (response.data.message === "unauthorized request") {
        return resp;
      }
    }
    return resp;
  },
  async (error) => {
    return error;
  }
);

const Providers = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const queryClient = new QueryClient();
  const [seatCount, setSeatCount] = useState(2);

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/api/v1/logged_in`, {
        withCredentials: true,
      });

      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthContext.Provider
        value={{ loggedIn, checkLoginState, user, seatCount, setSeatCount }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
