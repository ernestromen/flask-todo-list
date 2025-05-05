import React, { useEffect } from "react";
import AppRoutes from "./routes/ AppRoutes";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import { useDispatch } from "react-redux";
import { checkLogin } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);
  
  return (
    <div>
      <Header />
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
