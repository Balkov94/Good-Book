import styles from './BookOwnerCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

interface IBookOwnerCardProps {
   toggleBookMenu: () => void,
}

function BookOwnerCard({ toggleBookMenu }: IBookOwnerCardProps) {
   return (
      <div className={styles.ownerInfCoverContainer}>
         <div className={styles.userInfWrapper}>
            <div className={styles.closeIconContainer}>
               <CloseIcon onClick={toggleBookMenu} />
            </div>
            <h1>Book owner</h1>
            <div className={styles.ownerImgContainer}>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU" alt="user" />
            </div>
            <div className={styles.ownerTextContainer}>
               <p>name: fnmae lname</p>
               <p>email:barababa@gmail.com</p>
               <p>phone number: 515561515</p>
               <p>Description: or none</p>
            </div>
            <div className={styles.ownerIconsContainer}>
               <a href="#" target="_blank" rel="noreferrer">
                  <EmailIcon />
               </a>
               <a href="#" target="_blank" rel="noreferrer">
                  <CallIcon />
               </a>
            </div>
         </div>
      </div>
   );
}

export default BookOwnerCard;