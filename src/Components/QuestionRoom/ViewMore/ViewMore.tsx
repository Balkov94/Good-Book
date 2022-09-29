import Comment, { ICommentProps } from '../../Comment/Comment';
import TopQuestion from './TopQuestion/TopQuestion';
import styles from './ViewMore.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { commentApi } from '../../../Rest-APi-Client/client';



function ViewMore() {
   // 1. get state (props from QuestioCard) -> LInk state props / useLocation
   const { id, creatorId, questionPic, title, content, username, fname, lname, userPic }
      = useLocation().state;
   const [commentsList, setcommentsList] = useState<ICommentProps[]>();
   // 2. From id(question) fetch all comments !*id(question) === discussionId(comment)
   useEffect(() => {
      commentApi.findAll()
         .then((res: ICommentProps[]) => {
            //!!! get only if commend isClub===false
            const sortedComments = res.filter(c => (c.discussionId === id && c.isClub === false));
            setcommentsList(sortedComments);

         })
   }, [id])

   return (
      <div className={styles.mainViewMoreContainer}>
         <div className={styles.opacityFixerDiv}>
            <div className={styles.mainTitleContainer}> </div>
            <h1 >Discussion room</h1>
         </div>
         <TopQuestion {...{ id, creatorId, questionPic, title, content, username, fname, lname, userPic }}></TopQuestion>

         <h1 className={styles.sectionTitles}>Comments:</h1>
         <div className={styles.commentsWrapper}>
            <>
               {
                  commentsList?.map((comment, index) => {
                     return <Comment
                        key={comment.id}
                        id={comment.id}
                        creatorId={comment.creatorId}
                        discussionId={comment.discussionId}
                        content={comment.content}
                        orderIndex={index + 1}
                        isClub={comment.isClub}
                     />
                  })
               }
            </>
         </div>
      </div>
   );
}

export default ViewMore;