import QuestionAuthorHeader from './QuestionAuthorHeader';
import styles from './QuestionCard.module.css';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Link, Outlet } from 'react-router-dom';

export interface IQuestionCardProps {
   bookImg: string,
   bookTitle: string,
   bookQuestion: string,
   id: string,
}



function QuestionCard({ bookImg, bookTitle, bookQuestion, id }: IQuestionCardProps) {
   return (
      <>

         <div className={styles.mainContainer}>
            <div className={styles.bookImgContainer}>
               <img src={bookImg}
                  alt="test-img" />
            </div>
            <div className={styles.questionContainer}>
               <div className={styles.questionAuthor}>
                  <QuestionAuthorHeader></QuestionAuthorHeader>
               </div>
               <div className={styles.bookTitleContainer}>
                  <h3>Book title:</h3>
                  <h2>{bookTitle}</h2>
               </div>
               <div className={styles.questionText}>
                  <h6> <QuestionMarkIcon style={{ fontSize: "18px" }}></QuestionMarkIcon> Question:</h6>
                  <p>{bookQuestion}</p>
               </div>
               <div className={styles.btnContainer}>

                 
                  <Link to={`/QuestionRoom:${id}`}>
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