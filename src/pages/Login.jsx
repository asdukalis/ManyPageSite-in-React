import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import { useContext } from 'react'
import { AuthContext } from '../context/Context'

export default function Login() {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
    // console.log('logined')
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form className='login__form' onSubmit={login}>
        <MyInput type="text" placeholder='Username' />
        <MyInput type="password" placeholder='Password' />
        <MyButton >Login</MyButton>  
      </form>
    </div>
  )
}
