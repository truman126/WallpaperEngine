import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const payload = { email, password };

    await api
      .signup(payload)
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
        const error = axiosRes.response.data.Error
        setIsLoading(false);
        setError(error);
      });
  };
  return { signup, isLoading, error };
};
