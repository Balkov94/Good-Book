import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logged, token } from '../../App';
import { UserClass } from '../../Rest-APi-Client/shared-types';
import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
   const [loggedUser, setLoggedUser] = useContext(logged);
   const [authToken, setAuthToken] = useContext(token);
   const navigate = useNavigate();
   const location = useLocation();

   const handleLogin = (newLoggedUser: UserClass, token: string|undefined) => {
      if(token){
         setLoggedUser(newLoggedUser);
         setAuthToken(token);
         navigate("/QuestionRoom", { replace: true });
      }  
   }
   return (
      <div className={styles.LoginPageMainContainer}>
         <LoginForm onLogin={handleLogin} />
      </div>
   );
}

export default LoginPage;