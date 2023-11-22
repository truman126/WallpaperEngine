import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";

export const useGuestLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const guestLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);


    await api
      .guestLogin()
      .then((axiosRes) => {
        console.log(axiosRes)
        const data = axiosRes.data

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        //update the auth cointext
        dispatch({ type: "LOGIN", payload: data });

        setIsLoading(false);
      })
      
      .catch((axiosRes) => {
        const error = axiosRes.response.data.error
        setIsLoading(false);
        setError(error);
      });
  };
  return { guestLogin, isLoading, error };
};