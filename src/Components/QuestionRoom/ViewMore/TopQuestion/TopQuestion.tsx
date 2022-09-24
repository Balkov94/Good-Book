import QuestionAuthorHeader from '../../QuestionCard/QuestionAuthorHeader';
import { IQuestionAuthorHeaderProps, IQuestionCardProps } from '../../QuestionCard/QuestionCard';
import styles from './TopQuestion.module.css';


function TopQuestion({ id, creatorId, questionPic, title, content, username, fname, lname, userPic }: IQuestionCardProps & IQuestionAuthorHeaderProps) {
   return (
      <div className={styles.tqCard}>
         <div className={styles.qAuthor}>
            <QuestionAuthorHeader {...{ username, fname, lname, userPic }} />
         </div>
         <div className={styles.bookImgContainer}>
            <img src={questionPic} alt="book cover" />
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