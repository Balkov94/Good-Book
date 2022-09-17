import styles from './ClubCard.module.css';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
function BookClubCard() {
   return (
      <div className={styles.bClubCardMainContainer}>
         <div className={styles.nameContainer}>Some club name</div>
         <div className={styles.interestsContainer}>
            <Chip label="oneInterest" size="small" variant="filled" color="primary" />
            <Chip label="twointe" size="small" variant="filled" color="secondary" />
            <Chip label="three" size="small" variant="filled" color="warning" />
            <Chip label="three" size="small" variant="filled" color="success" />
            <Chip label="three" size="small" variant="filled" color="info" />
            <Chip label="three" size="small" variant="filled" color="info" />
       
         </div>
         <div className={styles.membersContainer}>
            <SupervisedUserCircleIcon/> 300
            <Button size="small" variant="contained" color="info">Sign in</Button>
         </div>
      </div>
   );
}

export default BookClubCard;