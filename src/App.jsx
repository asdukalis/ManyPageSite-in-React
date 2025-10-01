import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./context/Context";
import { BrowserRouter} from "react-router";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем статус аутентификации при загрузке приложения  

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem('auth', 'true');
    } else {
      localStorage.removeItem('auth');
    }
  }, [isAuth])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}> 
    <BrowserRouter>
      <Navbar />
       {/* <Navigate to="/error" /> */}
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}
