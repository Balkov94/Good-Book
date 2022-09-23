import { style } from '@mui/system';
import QuestionCard from '../QuestionCard/QuestionCard';
import Comment from '../../Comment/Comment';
import TopQuestion from './TopQuestion/TopQuestion';
import styles from './ViewMore.module.css';
import { useLocation } from 'react-router-dom';


function ViewMore() {
   // 1. get state (props from QuestioCard)
   // 2. Pass these props to child comonents 
   const { id, title, content, picture,creatorId } = useLocation().state;
   // console.log(id);
   // console.log(bookTitle);
   // console.log(bookQuestion);
   // console.log(bookImg);
   // console.log({id,bookTitle,bookQuestion,bookImg})
   // console.log(typeof {id,bookTitle,bookQuestion,bookImg})


   return (
      <div className={styles.mainViewMoreContainer}>
         <div className={styles.opacityFixerDiv}>
            <div className={styles.mainTitleContainer}> </div>
            <h1 >Discussion room</h1>
         </div>
         <TopQuestion {...{ id, title, content, picture,creatorId }}></TopQuestion>

         <h1 className={styles.sectionTitles}>Comments:</h1>
         <div className={styles.commentsWrapper}>
            <Comment></Comment>
            {/* <Comment></Comment>
            <Comment></Comment> */}

         </div>
      </div>
   );
}

export default ViewMore;