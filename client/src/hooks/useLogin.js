import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const payload = { email, password };

    await api
      .login(payload)
      .then((axiosRes) => {
        console.log("axios res");
        console.log(axiosRes)
        const data = axiosRes.data

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        //update the auth cointext
        dispatch({ type: "LOGIN", payload: data });

        setIsLoading(false);
      })
      
      .catch((axiosRes) => {
        console.log("axios res2");
        console.log(axiosRes);


        const error = axiosRes.response.data.error
        setIsLoading(false);
        setError(error);
      });
  };
  return { login, isLoading, error };
};
