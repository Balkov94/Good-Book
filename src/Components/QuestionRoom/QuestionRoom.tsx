import { Outlet } from 'react-router-dom';
import QuestionCard, { IQuestionAuthorHeaderProps, IQuestionCardProps } from './QuestionCard/QuestionCard';
import styles from './QuestionRoom.module.css';
import { useEffect, useState } from 'react';
import { questionApi, UserApi } from '../../Rest-APi-Client/client';

 interface questionListType extends IQuestionCardProps, IQuestionAuthorHeaderProps{};

function QuestionRoom() {
   // On visit QuestionRoom page
   //1.Get all Questions from the server
   //2. Iterate all Q and print them
   const [questionsList, setQuestionsList] = useState<questionListType[]>([]);
   useEffect(() => {
      const promise1 = questionApi.findAll()
      const promise2 = UserApi.findAll()
      Promise.all([promise1, promise2]).then((values) => {
         const questions = (values[0]); //questions
         const users = (values[1]); //users
         // make arr of mixed {}s with both q and u props
         const mixed:questionListType[] = users.map((x, i) => {
            return {
               ...x,
               ...questions[i]
            }
         })
         setQuestionsList(mixed);
      });

   }, []);
   
   return (
      <>
         <div className={styles.mainQuestionRoomContainer}>
            <div className={styles.mainTitleContainer}>? Questions Room &#191; </div>

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
            {/* render ViewMore in Absolute Zindex-10 DIV */}
            <Outlet />
         </div>

      </>

   );
}

export default QuestionRoom;