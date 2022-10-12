import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logged } from '../../App';
import { UserClass } from '../../Rest-APi-Client/shared-types';
import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {

   const [loggedUser, setLoggedUser] = useContext(logged);
   const navigate = useNavigate();
   const location = useLocation();
   console.log(location);
   const handleLogin = (newLoggedUser: UserClass) => {
      setLoggedUser(newLoggedUser);
      navigate("/QuestionRoom", { replace: true });
      // navigate((-1),{ replace: true });
   }
   return (
      <div className={styles.LoginPageMainContainer}>
         <LoginForm onLogin={handleLogin} />
      </div>
   );
}

export default LoginPage;