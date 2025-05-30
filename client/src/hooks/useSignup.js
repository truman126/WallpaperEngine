import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { validateEmail } from "../utils/EmailValidator";

export const useSignup = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, token) => {
    setIsLoading(true);
    setError(null);
    if (validateEmail(email)) {
      const payload = { email, password, token };

      await api
        .signup(payload)
        .then((axiosRes) => {
          const data = axiosRes.data

          //save the user to local storage
          localStorage.setItem("user", JSON.stringify(data));

          //update the auth cointext
          dispatch({ type: "LOGIN", payload: data });

          setIsLoading(false);
        })

        .catch((axiosRes) => {
          if (axiosRes.message === 'Network Error') {
            setError('Network Error.')
          }
          setError(axiosRes.response.data.error);
          setIsLoading(false);
        });
    }
    else {
      setError("Invalid Email");
    }
  };
  return { signup, signupError: error, signupIsLoading: isLoading };
};
