import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn, logOutAction } from "../features/auth/authSlice";

const useLogOut = () => {
  const dispatch = useDispatch();

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
        dispatch(logOutAction(false));
      })
      .catch((error) => {});
  };
  return logOut;
};

export default useLogOut;
