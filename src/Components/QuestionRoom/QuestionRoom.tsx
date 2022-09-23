import { Outlet } from 'react-router-dom';
import QuestionCard, { IQuestionAuthorHeaderProps, IQuestionCardProps } from './QuestionCard/QuestionCard';
import styles from './QuestionRoom.module.css';
import React, { useEffect, useState } from 'react';
import { questionApi, UserApi } from '../../Rest-APi-Client/client';


function QuestionRoom() {
   // On visit QuestionRoom page
   //1.Get all Questions from the server
   //2. Iterate all Q and print them
   const [questionsList, setQuestionsList] = useState<IQuestionCardProps[] | any[]>();
   const [questionCreators, setQuestionCreators] = useState<IQuestionAuthorHeaderProps[] | any[]>();
   useEffect(() => {
      const promise1 = questionApi.findAll()
      // .then(res => {
      //    console.log(res);
      //    setQuestionsList(res);
      // });
      const promise2 = UserApi.findAll()
      // .then(res => {
      //    console.log(res);
      //    setQuestionsList(res);
      // });
      Promise.all([promise1, promise2]).then((values) => {
         const questions = (values[0]); //questions
         const users = (values[1]); //users
         const mixed = users.map((x, i) => {
            return {
               ...x,
               ...questions[i]
            }

         })
         console.log(mixed);

      });

   }, []);
   // useEffect(() => {
   //    questionApi.findAll()
   //       .then(res => {
   //          console.log(res);
   //          setQuestionsList(res);
   //       })
   // }, []);
   // useEffect(() => {
   //    UserApi.findAll()
   //       .then(res => {
   //          console.log(res);
   //          setQuestionCreators(res);
   //       })
   // }, []);
   return (
      <>
         <div className={styles.mainQuestionRoomContainer}>
            <div className={styles.mainTitleContainer}>? Question Room &#191; </div>

            <div className={styles.qWraper}>
               {/* {
                  questionsList?.map((q, i) => {
                     return <QuestionCard
                        // card main
                        key={q.id}
                        id={q.id}
                        picture={q.picture}
                        title={q.title}
                        content={q.content}
                        creatorId={q.creatorId}
                        //card header (user box) with creator data
                        username={questionCreators![i].username}
                        fname={q.fname}
                        lname={q.lname}
                     />
                  })
               } */}
            </div>
            {/* render ViewMore in Absolute Zindex-10 DIV */}
            <Outlet />
         </div>

      </>

   );
}

export default QuestionRoom;