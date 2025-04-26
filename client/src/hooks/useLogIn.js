import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedIn, logOut } from "../features/auth/authSlice";

const useLogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const logIn = (formData) => {
    axios
      .post("http://localhost:5000/login", formData, { withCredentials: true })
      .then((response) => {
        dispatch(setLoggedIn(response.data));
        navigate("/");
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  };
  return logIn;
};

export default useLogIn;
