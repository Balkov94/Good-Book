import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logged } from '../../App';
import { UserClass } from '../../Rest-APi-Client/shared-types';
import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
   const [loggedUser, setLoggedUser] =useContext(logged);
   const navigate=useNavigate();

   const handleLogin=(newLoggedUser:UserClass)=>{
      setLoggedUser(newLoggedUser);
      navigate("/QuestionRoom");
   }

   return (
      <div className={styles.LoginPageMainContainer}>
         <LoginForm  onLogin={handleLogin}/>
      </div>
   );
}

export default LoginPage;