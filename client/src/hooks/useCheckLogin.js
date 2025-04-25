import { useEffect } from "react";

const useCheckLogin = (isLoggedIn,setIsLoggedIn) => {

  useEffect(() => {
    fetch("http://localhost:5000/check-login", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        console.log('naviagte please');
        console.log(data.loggedIn);
      });
  }, []);
};

export default useCheckLogin;
