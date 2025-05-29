import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../api";
import { validateEmail } from "../utils/EmailValidator";

export const useLogin = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password, token) => {
    setIsLoading(true);

    if (validateEmail(email)) {


      const payload = { email, password, token };

      const resp = await api
        .login(payload)
        .then((res) => {

          const data = res.data
          setIsLoading(false);

          //save the user to local storage
          localStorage.setItem("user", JSON.stringify(data));

          //update the auth cointext
          dispatch({ type: "LOGIN", payload: data });

        })
        .catch((res) => {
          if (res.message === 'Network Error') {
            setError('Network Error.')
          }
          setError(res.response.data.error);
          setIsLoading(false);
        });
    }
    else {
      setError("Invalid Email");
    }

  };
  return { login, loginError: error, loginisLoading: isLoading };
};
