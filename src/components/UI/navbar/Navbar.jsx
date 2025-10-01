
import { Link,Outlet } from "react-router";
import MyButton from "../button/MyButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/Context";

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    // console.log('logouted')  
  }

  return (
    <div className="navbar">
      <MyButton onClick={logout} style={{marginRight: '1rem'}}>
        Log out
      </MyButton>
      <nav className="navbar__links">
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/error">Error</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
