import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/ AppRoutes";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";

function App() {

  return (
    <div>
      <Header />
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
