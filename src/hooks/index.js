import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { getAllTweetsRequest, loginRequest, registerRequest } from "../api";
import {
  getItemFromLocalStorage,
  LOCAL_STORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
  setItemInLocalStorage,
  TOAST_CONFIG,
} from "../utils";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { TweetsContext } from "../providers/TweetsProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [isTokenChanged, setIsTokenChanged] = useState(false);

  useEffect(() => {
    if (getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY) == null) {
      setUser(null);
    } else {
      const token = jwtDecode(getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY));
      setUser({ username: token.sub });
    }
  }, [isTokenChanged]);

  const login = async (username, password) => {
    const res = await loginRequest(username, password);
    if (res.success) {
      setUser({
        username: res.data.username,
      });
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        res.data.jwt ? res.data.jwt : null
      );
      setIsTokenChanged(true);
      //   console.log(user);
      return { success: res.success };
    } else {
      return {
        success: res.success,
        message: res.message,
      };
    }
  };

  const logout = () => {
    removeItemInLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    toast.success("Logged out successfully", TOAST_CONFIG);
    setIsTokenChanged(!isTokenChanged);
  };

  const register = async (
    firstName,
    lastName,
    email,
    username,
    password,
    contactNumber
  ) => {
    const response = await registerRequest(
      firstName,
      lastName,
      email,
      username,
      password,
      contactNumber
    );

    return {
      success: response.success,
      message: response.message
        ? response.message
        : "User registered successfully",
    };
  };

  return {
    user,
    login,
    logout,
    register,
  };
};

//custom hoook for tweets context

export const useTweets = () => {
  return useContext(TweetsContext);
};

export const useProvideTweets = () => {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getTweets();
  }, [refresh]);

  const getTweets = async () => {
    const res = await getAllTweetsRequest();
    setTweets(res.data.tweets);
    setLoading(false);
  };

  const setRefreshValue = () => {
    setRefresh(!refresh);
  };

  return {
    tweets,
    setRefreshValue,
    loading,
  };
};
