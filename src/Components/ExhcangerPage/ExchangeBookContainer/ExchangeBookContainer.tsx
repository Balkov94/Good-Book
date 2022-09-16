import BookCard from "../BookCard/BookCard";
import styles from "./ExBookC.module.css";

function ExchangeBookContainer() {
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

export default ExchangeBookContainer;