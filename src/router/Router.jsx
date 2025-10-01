import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from "../pages/Error";
import Login from "../pages/Login";

export const privateRoutes = [
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> }, // Set as index route
  { path: "/posts/:id", element: <PostIdPage />},
  { path: "/error", element: <Error /> },
  // { path: '*', element: <Navigate to="/login" /> } // Redirect any unknown routes to /login
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  // { path: '/register', element: <Register /> },
  // { path: '/forgot-password', element: <ForgotPassword /> },
];