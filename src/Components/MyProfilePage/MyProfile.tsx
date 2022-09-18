import styles from './MyProfile.module.css';
import { Button } from "@mui/material";
import MyProfileCard from './MyProfileCard/MyProfileCard';
import MyBooks from './MyBooks/MyBooks';

function MyProfile() {
   return (
      <div className={styles.MyProfileMainContainer}>
         <h1>My profile:</h1>
         <MyProfileCard/>
         <h1>My books for exchange:</h1>
         <MyBooks/>
      </div>
   );
}

export default MyProfile;