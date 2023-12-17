import styles from './MyProfile.module.css';
import MyProfileCard from './MyProfileCard/MyProfileCard';
import MyBooks from './MyBooks/MyBooks';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { logged } from '../../App';
import { toast } from 'react-toastify';

function MyProfile() {
   //1.Fetch logged user data for MyPRofileCard
   const [loggedUser, setLoggedUser] = useContext(logged);
   
   useEffect(() => {
      if(loggedUser.status==2){
         toast("Your profile is DEACTIVATED.",{type:"warning",autoClose:3000});
         toast("Your actions are restricted.",{type:"warning",autoClose:3000});
         toast.clearWaitingQueue();
      }
   }, [loggedUser]);

   return (
      <div className={styles.MyProfileMainContainer}>
         <h1>My profile:</h1>
         <MyProfileCard loggedUser={loggedUser}/>
         <h1>My books for exchange:</h1>
         <div className={styles.addBookBtnContainer}>
            <Link to={loggedUser.status==2 ? '#':'/ExchangePage/Book-Form'} style={{ cursor: 'default' }}>
               <Button variant="contained" size="small" color="success" disabled={loggedUser.status==2}  >
                  <MenuBookIcon style={{ marginRight: "6px" }} />
                  Add a book to the exchange page
               </Button>
            </Link>
         </div>
         <MyBooks/>
      </div>
   );
}

export default MyProfile;