import styles from './BookCard.module.css';
import { useState } from 'react';
import BookOwnerCard from '../BookOwnerCard/BookOwnerCard';
import InfoIcon from '@mui/icons-material/Info';


export interface IBookCardProps {
   id: number,
   ownerId: number,
   title: string,
   bookPic: string,
}

function BookCard({ id, ownerId, title, bookPic }: IBookCardProps) {
   const [bookMenu, setBookMenu] = useState<boolean>(false);

   const toggleBookMenu = () => {
      setBookMenu(bookMenu => !bookMenu);
   }

   return (
      <>
         <div className={styles.bookMainContainer}>
            <div className={styles.imgContainer}>
               <img src={bookPic} alt="book cover" />
            </div>
            <div className={styles.titleContainer}>
               <h1>{title}</h1>
            </div>
            <InfoIcon className={styles.contactIcon} style={{ fontSize: "30px" }}
               onClick={toggleBookMenu} />
         </div>
         {
            bookMenu
            && <BookOwnerCard
               toggleBookMenu={toggleBookMenu}
               title={title}
               ownerId={ownerId}
            />
         }
      </>
   );
}

export default BookCard;