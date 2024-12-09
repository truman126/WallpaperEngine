import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";

export const useGuestLogin = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const guestLogin = async (token) => {
    setIsLoading(true);
    setError(null);
    const payload = { token }


    await api
      .guestLogin(payload)
      .then((axiosRes) => {
        const data = axiosRes.data

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        //update the auth cointext
        dispatch({ type: "LOGIN", payload: data });

        setIsLoading(false);
      })
      
      .catch((axiosRes) => {
        if (axiosRes.message === 'Network Error' ){
          setError('Network Error.')
        }
        setError(axiosRes.response.data.error);

        setIsLoading(false);
      });
  };
  return { guestLogin,guestLoginError: error  , guestIsLoading: isLoading};
};