import QuestionAuthorHeader from './QuestionAuthorHeader';
import styles from './QuestionCard.module.css';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link } from 'react-router-dom';
import { IEntireQuestionData } from '../QuestionRoom';

export interface IQuestionAuthorHeaderProps {
   username: string,
   fname: string,
   lname: string,
   userPic: string,
}

function QuestionCard({ questionPic, title, content, id, creatorId, username, fname, lname, userPic }
   : IEntireQuestionData) {
   return (
      <>
         <div className={styles.mainContainer}>
            <div className={styles.bookImgContainer}>
               <img src={questionPic}
                  alt="test-img" />
            </div>
            <div className={styles.questionContainer}>
               <div className={styles.questionAuthor}>
                  <QuestionAuthorHeader {...{ username, fname, lname, userPic }} />
               </div>
               <div className={styles.bookTitleContainer}>
                  <h3>Book title:</h3>
                  <h2>{title}</h2>
               </div>
               <div className={styles.questionText}>
                  <h6> <QuestionMarkIcon style={{ fontSize: "18px" }} />
                     Question:
                  </h6>
                  <p>{content}</p>
               </div>
               <div className={styles.btnContainer}>

                  <Link
                     to={`/QuestionRoom/question${id}`}
                     state={{ id, creatorId, questionPic, title, content, username, fname, lname, userPic }}>
                     <Button variant="contained" color="warning" className={styles.ViewMoreBtn}>
                        view more...
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}

export default QuestionCard;