import styles from './BookCard.module.css';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';

function BookCard() {
   const [bookMenu, setBookMenu] = useState<boolean>(false);
   const toggleBookMenu=()=>{
      setBookMenu(bookMenu=>!bookMenu);
   }

   return (
      <>
         <div className={styles.bookMainContainer}>
            <div className={styles.imgContainer}>
               <img src="https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/g/e/16d80d1e9f00f986068d3a92c563ba1a/genezis-era-20.jpg" alt="book cover" />
            </div>
            <div className={styles.titleContainer}>
               <h1>some long and stupid title Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ullam, nesciunt harum laudantium dolorum ab</h1>
            </div>
            <ListIcon className={styles.contactIcon} style={{ fontSize: "30px" }} 
            onClick={toggleBookMenu}/>
         </div>
         {
            bookMenu &&
            <div className={styles.ownerInfCoverContainer}>
                  <div className={styles.userInfWrapper}>
                     <h1  onClick={toggleBookMenu} style={{fontSize:"40px"}}>x</h1>
                  </div>
            </div>
         }
      </>


   );
}

export default BookCard;