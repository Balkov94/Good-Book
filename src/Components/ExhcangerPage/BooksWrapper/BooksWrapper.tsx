import BookCard from "../BookCard/BookCard";
import styles from "./BooksWrapper.module.css";

function BooksWrapper() {
   return (  
      <div className={styles.booksWrapper}>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
      </div>
   );
}

export default BooksWrapper;