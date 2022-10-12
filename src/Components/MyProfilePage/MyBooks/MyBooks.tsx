import BookCard, { IBookCardProps } from '../../ExhcangerPage/BookCard/BookCard';
import styles from './MyBooks.module.css';
import { useContext, useEffect, useState } from 'react';
import { bookApi } from '../../../Rest-APi-Client/client';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

function MyBooks() {
   const [booksList, setBooksList] = useState<IBookCardProps[]>();
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
      </div>
   );
}

export default MyBooks;