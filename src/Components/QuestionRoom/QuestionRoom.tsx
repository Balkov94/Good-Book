import { Outlet } from 'react-router-dom';
import QuestionCard, { IQuestionCardProps } from './QuestionCard/QuestionCard';
import styles from './QuestionRoom.module.css';

const bookQuestions: IQuestionCardProps[] = [
   {
      id: "1",
      bookImg: "https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/b/r/b3f75afdb59284ea0f7dbac6221d3871/bridzhartan-5--na-sar-filip--s-lyubov-20.jpg",
      bookTitle: "Book ONE 111",
      bookQuestion: "FIRST QUESTION 1?",
   },
   {
      id: "2",
      bookImg: "https://cdn.ozone.bg/media/catalog/product/cache/1/small_image/178x222/9df78eab33525d08d6e5fb8d27136e95/h/r/127e62aaadcc8684c15c8ddad41446ed/hronika-na-bolkata-20.jpg",
      bookTitle: "TWO 222",
      bookQuestion: "FIRST safkoalskf;laskf;laks;flka;lfsk;laskflasfk;alksf;lakf;laksf;lak;fk?",
   }
]



function QuestionRoom() {
   return (
      <div className={styles.mainQuestionRoomContainer}>
         <div className={styles.mainTitleContainer}>? Question Room &#191; </div>

         <div className={styles.qWraper}>
            {
               bookQuestions.map(q => {
                  return <QuestionCard
                  key={q.id}
                     id={q.id}
                     bookImg={q.bookImg}
                     bookTitle={q.bookTitle}
                     bookQuestion={q.bookQuestion}

                  />
               })
            }
         </div>

         {/* <div className={styles.questionRoomOutlet}> */}
            {/* <Outlet /> */}
         {/* </div> */}


      </div>
   );
}

export default QuestionRoom;