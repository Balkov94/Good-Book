import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
   return (  
      <div className={styles.LoginPageMainContainer}>
            <LoginForm/>
      </div>
   );
}

export default LoginPage;