import { style } from '@mui/system';
import QuestionAuthorHeader from '../../QuestionCard/QuestionAuthorHeader';
import { IQuestionCardProps } from '../../QuestionCard/QuestionCard';
import styles from './TopQuestion.module.css';


function TopQuestion({ id, creatorId, title, content,picture }: IQuestionCardProps) {
   return (
      <div className={styles.tqCard}>
         <div className={styles.qAuthor}>
            {/* <QuestionAuthorHeader></QuestionAuthorHeader> */}
         </div>
         <div className={styles.bookImgContainer}>
            <img src={picture} alt="book cover" />
         </div>
         <div className={styles.textContainer}>
            <div className={styles.bookTitle}>
               <h1>Book title:{title}</h1>
            </div>
            <div className={styles.questionText}>
               <p>{content}</p>
            </div>
         </div>
      </div>
   );
}

export default TopQuestion;