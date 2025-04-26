import { useEffect } from "react";

const useCheckLogin = (isLoggedIn, setIsLoggedIn, user, setUser) => {
  useEffect(() => {
    fetch("http://localhost:5000/check-login", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setUser(data.user.username);
      });
  }, []);
};

export default useCheckLogin;
