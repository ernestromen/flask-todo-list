import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const useLogOut = () => {
  const { setIsLoggedIn } = useAuth();

  const logOut = () => {
    axios
      .post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsLoggedIn(false);
      })
      .catch((error) => {});
  };
  return logOut
};

export default useLogOut;
