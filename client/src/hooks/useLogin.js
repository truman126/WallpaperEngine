import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";

export const useLogin = () => {
  const [error, setError] = useState("no error");
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, token) => {
    setIsLoading(true);
    

    const payload = { email, password , token };
    
    const resp = await api
      .login(payload)
      .then((res) => {
        console.log("No Login Error")
        console.log(res)
        const data = res.data
        setIsLoading(false);

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        //update the auth cointext
        dispatch({ type: "LOGIN", payload: data });

      })
      .catch((res) => {
        console.log("There was an error with login");
        console.log(res);

        setError(res.response.data.error);
        console.log("Error", error)

        setIsLoading(false);
      });
      
  };
  console.log("returning", error)
  return { login, loginError: error, loginisLoading: isLoading };
};
