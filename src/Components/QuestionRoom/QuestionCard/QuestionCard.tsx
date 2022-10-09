import QuestionAuthorHeader from './QuestionAuthorHeader';
import styles from './QuestionCard.module.css';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link } from 'react-router-dom';
import { IdType, TimeOfModificationType } from '../../../Rest-APi-Client/shared-types';

// i for question data
export interface IQuestionCardProps {
   questionPic: string,
   title: string,
   content: string,
   creatorId: string,
   id: IdType,
   timeOfCreation: string,
   timeOfModification: TimeOfModificationType,


}
// i for user data (question creator)
export interface IQuestionAuthorHeaderProps {
   username: string,
   fname: string,
   lname: string,
   userPic: string,
}

function QuestionCard({ questionPic, title, content, id, creatorId, username, fname, lname, userPic }: IQuestionCardProps & IQuestionAuthorHeaderProps) {
   return (
      <>
         <div className={styles.mainContainer}>
            <div className={styles.bookImgContainer}>
               <img src={questionPic}
                  alt="test-img" />
            </div>
            <div className={styles.questionContainer}>
               <div className={styles.questionAuthor}>
                  {/* Question Creator(user) data */}
                  <QuestionAuthorHeader {...{ username, fname, lname, userPic }} />
               </div>
               <div className={styles.bookTitleContainer}>
                  <h3>Book title:</h3>
                  <h2>{title}</h2>
               </div>
               <div className={styles.questionText}>
                  <h6> <QuestionMarkIcon style={{ fontSize: "18px" }}></QuestionMarkIcon> Question:</h6>
                  <p>{content}</p>
               </div>
               <div className={styles.btnContainer}>

                  <Link
                     // ViewMore component -> Outlet is located QuestionRoom
                     // to={`/QuestionRoom/:question${id}`}
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