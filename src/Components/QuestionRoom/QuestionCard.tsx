import QuestionAuthorHeader from './QuestionAuthorHeader';
import styles from './QuestionCard.module.css';
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';



function QuestionCard() {
   return (
      <div className={styles.mainContainer}>
         <div className={styles.bookImgContainer}>
            <img src="https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/n/a/7bf97bd09e1ab1e74f0be24c55bd7b51/narkos-20.jpg"
               alt="test-img" />
         </div>
         <div className={styles.questionContainer}>
            <div className={styles.questionAuthor}>
               <QuestionAuthorHeader></QuestionAuthorHeader>
            </div>
            <div className={styles.bookTitleContainer}>
               <h3>Book title:</h3>
               <h2>Some very long and stupid book title lor</h2>
            </div>
            <div className={styles.questionText}>
               <h6> <QuestionMarkIcon style={{fontSize:"18px"}}></QuestionMarkIcon> Question:</h6>
               <p>Lorem ipsum dolor sit amet consectetur  dipisicing elit. Eos rerum, maxime harum cupiditate ab provident ea aspernatur incidunt cum nihil accusantium quas temporibus in sed dolor alias ratione sapiente sunt?</p>
            </div>
            <div className={styles.btnContainer}>
               <Button variant="contained" color="warning" className={styles.ViewMoreBtn}>
                  view more ...
               </Button>
            </div>

         </div>
      </div>
   );
}

export default QuestionCard;