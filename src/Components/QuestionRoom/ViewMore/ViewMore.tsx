import { style } from '@mui/system';
import QuestionCard from '../QuestionCard/QuestionCard';
import Comment from './Comment/Comment';
import TopQuestion from './TopQuestion/TopQuestion';
import styles from './ViewMore.module.css';


function ViewMore() {
   return (
      <div className={styles.mainViewMoreContainer}>
         <div className={styles.opacityFixerDiv}>
            <div className={styles.mainTitleContainer}> </div>
               <h1 >Discussion room</h1>
         </div>

         <TopQuestion></TopQuestion>

         <h1 className={styles.sectionTitles}>Comments:</h1>
         <div className={styles.commentsWrapper}>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>

         </div>
      </div>
   );
}

export default ViewMore;