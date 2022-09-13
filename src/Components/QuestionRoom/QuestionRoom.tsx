import QuestionCard from './QuestionCard';
import styles from './QuestionRoom.module.css';




function QuestionRoom() {
   return (  
      <div className={styles.mainContainer}>
            <div className={styles.mainTitleContainer}>? Question Room &#191; </div>

            <div className={styles.qWraper}>
               <QuestionCard></QuestionCard>
               <QuestionCard></QuestionCard>
               <QuestionCard></QuestionCard>
               <QuestionCard></QuestionCard>
               <QuestionCard></QuestionCard>
            </div>

      </div>
   );
}

export default QuestionRoom;