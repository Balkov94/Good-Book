
import QuestionCard, { IQuestionAuthorHeaderProps, IQuestionCardProps } from './QuestionCard/QuestionCard';
import styles from './QuestionRoom.module.css';
import { useEffect, useState } from 'react';
import { questionApi, UserApi } from '../../Rest-APi-Client/client';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface questionListType extends IQuestionCardProps, IQuestionAuthorHeaderProps { };

function QuestionRoom() {
   // On visit QuestionRoom page
   //1.Get all Questions from the server
   //2. Iterate all Q and print them
   const [questionsList, setQuestionsList] = useState<questionListType[]>([]);
   useEffect(() => {
      const questions = questionApi.findAll()
      const users = UserApi.findAll()
      Promise.all([questions, users]).then((values) => {
         const questions = (values[0]); //questions
         const users = (values[1]); //users
         // make arr of mixed {}s with both q and u props
         const mixed: questionListType[] = questions.map((qData, i) => {
            return {
               ...(users.find(user=>user.id===qData.creatorId)),
               ...qData
               // ! qData SECOND, to override id(user) with id(question)
            }
         })
         setQuestionsList(mixed);
      });

   }, []);

   return (
      <>
         <div className={styles.mainQuestionRoomContainer}>
            <div className={styles.mainTitleContainer}>❔Quest<span style={{color:"#922B21"}}>&#191;</span>ons Room ❔ </div>

            <div className={styles.qWraper}>
               {
                  questionsList.map(q => {
                     return <QuestionCard
                        // card main
                        key={q.id}
                        id={q.id}
                        questionPic={q.questionPic}
                        title={q.title}
                        content={q.content}
                        creatorId={q.creatorId}
                        //card header (user box) with creator data
                        username={q.username}
                        fname={q.fname}
                        lname={q.lname}
                        userPic={q.userPic}
                     />
                  })
               }
            </div>
         </div>
         {/* Ask question Btn container goes to CRUDQFormComponent*/}
         <Link to="/QuestionRoom/createQuestion">
         <div className={styles.askQContainer}>
                <Button variant="contained"><HelpOutlineIcon style={{marginRight:"4px"}}/>Ask Question</Button>
            </div>
         </Link>
           
      </>

   );
}

export default QuestionRoom;