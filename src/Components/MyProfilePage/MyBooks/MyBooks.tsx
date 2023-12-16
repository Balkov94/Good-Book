import BookCard, { IBookCardProps } from '../../ExhcangerPage/BookCard/BookCard';
import styles from './MyBooks.module.css';
import { useContext, useEffect, useState } from 'react';
import { bookApi } from '../../../Rest-APi-Client/client';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

function MyBooks() {
   const [booksList, setBooksList] = useState<IBookCardProps[]>([]);
   const [loggedUser, setLoggedUser] = useContext(logged);
   useEffect(() => {
      bookApi.findAll()
         .then((allbooks: IBookCardProps[]) => {
            const sorted = allbooks.filter(b => b.ownerId === loggedUser.id);
            setBooksList(sorted)
         })
         .catch(() => {
            toast("Operation fail", { type: "error" });
         })
   }, [loggedUser])

   return (
      <div className={styles.myBooksWrapper}>
         {
            booksList?.map(b => {
               return (
                  <BookCard
                     key={b.id}
                     id={b.id}
                     ownerId={b.ownerId}
                     title={b.title}
                     bookPic={b.bookPic}
                  />
               )
            })
         }
         {
            booksList?.length < 1
            && 
            <div className={styles.noBooksContainer}>
            <h1>Don't have any books for exchange.</h1>
            <h1>Why don't you add some? </h1> 
            </div>
         }
      </div>
   );
}

export default MyBooks;