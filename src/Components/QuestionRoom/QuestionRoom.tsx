
import QuestionCard from './QuestionCard/QuestionCard';
import styles from './QuestionRoom.module.css';
import { useEffect, useState } from 'react';
import { questionApi, UserApi } from '../../Rest-APi-Client/client';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IdType } from '../../Rest-APi-Client/shared-types';

export interface IEntireQuestionData {
   id: IdType,
   questionPic: string,
   title: string,
   content: string,
   creatorId: string,
   username: string,
   fname: string,
   lname: string,
   userPic: string,
}

function QuestionRoom() {
   const [questionsList, setQuestionsList] = useState<IEntireQuestionData[]>([]);
   useEffect(() => {
      const questions = questionApi.findAll();
      const users = UserApi.findAll();

      Promise.all([questions, users]).then((values) => {
         const questions = (values[0]);
         const users = (values[1]);
         const questionCardData:any = questions.map((qData) => {
            return {
               ...(users.find(user => user.id === qData.creatorId)),
               ...qData
               // *qData SECOND! to override id(user) with id(question)
            }
         })
         setQuestionsList(questionCardData);
      });

   }, []);

   return (
      <>
         <div className={styles.mainQuestionRoomContainer}>
            <div className={styles.mainTitleContainer}>❔Quest<span style={{ color: "#922B21" }}>&#191;</span>ons Room ❔ </div>
            
            <div className={styles.qWraper}>
               {
                  questionsList.map(q => {
                     return <QuestionCard
                        key={q.id}
                        id={q.id}
                        questionPic={q.questionPic}
                        title={q.title}
                        content={q.content}
                        creatorId={q.creatorId}
                      
                        username={q.username}
                        fname={q.fname}
                        lname={q.lname}
                        userPic={q.userPic}
                     />
                  })
               }
            </div>
         </div>
  
         <Link to="/QuestionRoom/createQuestion">
            <div className={styles.askQContainer}>
               <Button variant="contained"><HelpOutlineIcon style={{ marginRight: "4px" }} />Ask Question</Button>
            </div>
         </Link>

      </>

   );
}

export default QuestionRoom;