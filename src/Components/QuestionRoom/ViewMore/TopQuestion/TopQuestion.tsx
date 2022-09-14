import { style } from '@mui/system';
import QuestionAuthorHeader from '../../QuestionCard/QuestionAuthorHeader';
import styles from './TopQuestion.module.css';


function TopQuestion() {
   return (
      <div className={styles.tqCard}>
         <div className={styles.qAuthor}>
            <QuestionAuthorHeader></QuestionAuthorHeader>
         </div>
         <div className={styles.bookImgContainer}>
            <img src="https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/h/r/127e62aaadcc8684c15c8ddad41446ed/hronika-na-bolkata-20.jpg" alt="book" />
         </div>
         <div className={styles.textContainer}>
            <div className={styles.bookTitle}>
               <h1>Book title: Lorem ipsum dolor, sit amet consectetur adipisicing elit. At quidem laborum cupiditate vero, animi modi optio autem blanditiis odit numquam eius asperiores consectetur ipsum non unde quia saepe corrupti voluptatem.</h1>
            </div>
            <div className={styles.questionText}>
                  <p>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt hic nihil dolores alias iste possimus repudiandae, minus quia pariatur quidem provident, maiores necessitatibus facere id beatae magni tempore. Dicta, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique consequuntur, porro aut ipsa ducimus, dolore eligendi earum inventore culpa aliquam perspiciatis, obcaecati unde sequi laboriosam laudantium vel natus iure ab!
                  </p>
            </div>
         </div>
      </div>
   );
}

export default TopQuestion;