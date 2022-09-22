
import RegisterForm from './RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';


function RegisterPage() {
   return (     
      <div className={styles.registerPageMainContainer}>
            <RegisterForm/>
      </div>
   );
}

export default RegisterPage;