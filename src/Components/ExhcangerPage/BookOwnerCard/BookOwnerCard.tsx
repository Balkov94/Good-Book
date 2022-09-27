import styles from './BookOwnerCard.module.css';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { useEffect, useState } from 'react';
import { UserApi } from '../../../Rest-APi-Client/client';

interface IBookOwnerCardProps {
   toggleBookMenu: () => void,
   title: string,
   ownerId: number,
}
// need interface for User full date
interface IOwner {
   fname: string,
   lname: string,
   mail: string,
   phone: string,
   userPic: string,
   description: string,

}
function BookOwnerCard({ toggleBookMenu, title, ownerId, }: IBookOwnerCardProps) {
   //1. Fetch user (by ownerId),JSON-Server so fetch all an sort by props
   const [owner, setOwner] = useState<IOwner>();
   useEffect(() => {
      UserApi.findAll()
         .then(res => {
            const user = res.find(u => u.id === ownerId);
            setOwner(user);
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
               <p style={{marginTop:"8px"}}>Description: {owner?.description}</p>
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