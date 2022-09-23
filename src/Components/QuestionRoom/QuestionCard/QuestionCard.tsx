import QuestionAuthorHeader from './QuestionAuthorHeader';
import styles from './QuestionCard.module.css';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link } from 'react-router-dom';

export interface IQuestionCardProps {
   picture: string,
   title: string,
   content: string,
   creatorId: string,
   id: string,

}
export interface IQuestionAuthorHeaderProps{
   username:string,
   fname:string,
   lname:string,
   picture?:string
}

function QuestionCard({ picture, title, content, id, creatorId ,username,fname,lname,}: IQuestionCardProps & IQuestionAuthorHeaderProps) {
   // 1.Make Request to BD by creatorId (userId) - useEffect
   //2. Put the fetched data to QuestionAuthorHeader
   return (
      <>

         <div className={styles.mainContainer}>
            <div className={styles.bookImgContainer}>
               <img src={picture}
                  alt="test-img" />
            </div>
            <div className={styles.questionContainer}>
               <div className={styles.questionAuthor}>
                  {/* Question Creator(user) data */}
                  <QuestionAuthorHeader {...{username,fname,lname}}/>


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
                     to={`/QuestionRoom/:${id}`}
                     state={{ picture, title, content, id, creatorId }}>
                     <Button variant="contained" color="warning" className={styles.ViewMoreBtn}>
                        view more ...
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}

export default QuestionCard;