import QuestionAuthorHeader from '../../QuestionCard/QuestionAuthorHeader';
import styles from './TopQuestion.module.css';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { IEntireQuestionData } from '../../QuestionRoom';

function TopQuestion({ id, creatorId, questionPic, title, content, username, fname, lname, userPic, }
   : IEntireQuestionData) {

   const params = useParams();

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

         {/* EDIT QUESTION Btn  goes to CRUDQFOrmComponent */}
         <Link to={`/QuestionRoom/${params.questionId}/edit`}
            // <Link to={`/QuestionRoom/${params.questionId}`}
            state={{ id, questionPic, title, content, creatorId }}
         >
            <div className={styles.editQBtnContainer}>
               <Button variant="outlined" color="warning">Edit Question</Button>
            </div>
         </Link>

      </div>
   );
}

export default TopQuestion;