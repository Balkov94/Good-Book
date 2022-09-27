import BookCard, { IBookCardProps } from "../BookCard/BookCard";
import styles from "./BooksWrapper.module.css";
import { useEffect, useState } from 'react';
import { bookApi } from "../../../Rest-APi-Client/client";
function BooksWrapper() {
   //1. fetch all Books
   const [booksList, setBooksList] = useState<IBookCardProps[] | undefined>();
   useEffect(() => {
      bookApi.findAll()
         .then(res => {
            setBooksList(res)
         })
   }, [])
   
   return (
      <div className={styles.booksWrapper}>
         {
            booksList?.map(b => <BookCard key={b.id} id={b.id} ownerId={b.ownerId} title={b.title} bookPic={b.bookPic} />)
         }
      </div>
   );
}

export default BooksWrapper;