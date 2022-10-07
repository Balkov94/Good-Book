import BookCard, { IBookCardProps } from '../../ExhcangerPage/BookCard/BookCard';
import styles from './MyBooks.module.css';
import { useEffect, useState } from 'react';
import { bookApi } from '../../../Rest-APi-Client/client';

function MyBooks() {
   //1. Fetch logged user Book (for enxhange)
   //! lets exprct user with id1 is logged now
   const [booksList, setBooksList] = useState<IBookCardProps[]>();
   useEffect(() => {
      // JSON-Server - get all books and sort by userId
      const loggedUser = "1"
      bookApi.findAll()
         .then((allbooks: IBookCardProps[]) => {
            const sorted = allbooks.filter(b => b.ownerId === loggedUser);
            setBooksList(sorted)
         })
   }, [])

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