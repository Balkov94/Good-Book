import styles from './BookCard.module.css';
import { useState } from 'react';
import BookOwnerCard from '../BookOwnerCard/BookOwnerCard';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export interface IBookCardProps {
   id: string,
   ownerId: string,
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
            <div className={styles.removeBookBtnContainer}>
               <Link to="/ExchangePage/Book-Form" state={{id, ownerId, title, bookPic}}>
                  <Button variant="contained" color="warning" size="small">
                     Edit book
                  </Button>
               </Link>
            </div>
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