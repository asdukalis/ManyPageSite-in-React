import { Routes, Route, Navigate,  } from "react-router";
import { privateRoutes, publicRoutes } from "../router/Router";
import { useContext } from "react";
import { AuthContext } from "../context/Context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  if (isLoading) {
    return <div><Loader/></div>
  }
  // const isAuth = false; // Simulated authentication status
  // console.log(isAuth)
  // Если пользователь не авторизован, показываем только публичные маршруты
  if (!isAuth) {
    return (
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* Все остальные пути ведут на логин */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  // Если пользователь авторизован, показываем приватные маршруты
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {/* Редирект на основную страницу для несуществующих маршрутов */}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};

export default AppRouter;
