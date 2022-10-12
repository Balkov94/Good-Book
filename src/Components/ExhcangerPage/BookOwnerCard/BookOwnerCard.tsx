import styles from './BookOwnerCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { useEffect, useState } from 'react';
import { UserClass } from '../../../Rest-APi-Client/shared-types';
import { toast } from 'react-toastify';

interface IBookOwnerCardProps {
   toggleBookMenu: () => void,
   title: string,
   ownerId: string,
}

function BookOwnerCard({ toggleBookMenu, title, ownerId, }: IBookOwnerCardProps) {
   const [owner, setOwner] = useState<UserClass>();
   useEffect(() => {
      fetch(`http://localhost:8000/api/AllUsers/${ownerId}`)
         .then(res => res.json())
         .then((data: UserClass) => {
            setOwner(data);
         })
         .catch(() => {
            toast("Operation fail", { type: "error" })
         })
   }, [ownerId])

   return (
      <div className={styles.ownerInfCoverContainer}>
         <div className={styles.userInfWrapper}>
            <div className={styles.closeIconContainer}>
               <CloseIcon onClick={toggleBookMenu} />
            </div>
            <h1>Book owner:</h1>
            <div className={styles.ownerImgContainer}>
               <img src={owner?.userPic} alt="user" />
            </div>
            <div className={styles.ownerTextContainer}>
               <div className={styles.ownerTextContainerPLine}>
                  <p>name:</p>
                  <p>{`${owner?.fname} ${owner?.lname}`}</p>
               </div>
               <div className={styles.ownerTextContainerPLine}>
                  <p>email:</p>
                  <p>{owner?.mail}</p>
               </div>
               <div className={styles.ownerTextContainerPLine}>
                  <p>phone number: </p>
                  <p>{owner?.phone}</p>
               </div>
               <p style={{ marginTop: "8px" }}>Description: {owner?.description}</p>
            </div>
            <div className={styles.ownerIconsContainer}>
               <a href={"mailto:" + owner?.mail} >
                  <EmailIcon />
               </a>
               <a href={"tel:" + owner?.phone}  >
                  <CallIcon />
               </a>
            </div>
         </div>
      </div>
   );
}

export default BookOwnerCard;