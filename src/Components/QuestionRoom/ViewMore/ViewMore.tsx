import Comment, { ICommentProps } from '../../Comment/Comment';
import TopQuestion from './TopQuestion/TopQuestion';
import styles from './ViewMore.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { commentApi } from '../../../Rest-APi-Client/client';
import CRUDCommentBtn from '../../CRUDCommentBtn/CRUDCommentBtn';
import { CommentClass } from '../../../Rest-APi-Client/shared-types';
import { logged } from '../../../App';
import Button from '@mui/material/Button';

function ViewMore() {
   // 1. get state (props from QuestioCard) -> Link state props / useLocation
   const { id, creatorId, questionPic, title, content, username, fname, lname, userPic }
      = useLocation().state;
   const [commentsList, setcommentsList] = useState<ICommentProps[]>();
   const [loggedUser, setLoggedUser] = useContext(logged);
   
   useEffect(() => {
      commentApi.findAll()
         .then((res: CommentClass[]) => {
            const sortedComments = res.filter(c => (c.discussionId === id && c.isClub === false));
            setcommentsList(sortedComments);
         })
   }, [id])


   // UI updater functions // 
   const updateCommentList = (currComment: ICommentProps) => {
      // delete from UI
      if (currComment.content === "_this_entity_was_deleted") {
         setcommentsList(commentsList => {
            return (
               commentsList?.filter(c => c.id !== currComment.id)
            )
         })
      }
      // Update edited comment
      else {
         if (commentsList?.some(comment => comment.id === currComment?.id)) {
            setcommentsList(commentsList => {
               return (
                  commentsList?.map(c => {
                     if (c.id === currComment.id) {
                        return currComment;
                     }
                     return c;
                  })
               )
            });
         }
         // Update list with new created comment
         else {
            setcommentsList(commentsList => [...(commentsList || []), currComment]);
         }
      }
   }

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
                        key={(comment.id)}
                        id={comment.id}
                        creatorId={comment.creatorId}
                        discussionId={comment.discussionId}
                        content={comment.content}
                        orderIndex={index + 1}
                        isClub={comment.isClub}
                        timeOfCreation={comment.timeOfCreation}
                        timeOfModification={comment.timeOfModification}

                        onUpdateCommentList={updateCommentList}
                     />
                  })
               }
            </>
         </div>
         {/* add comment for ReadingClubs -> ClubRoom  */}
         {
            loggedUser.id === "guest"
               ? <div className={styles.addCommentContainer}>
                  <Link to="/Login">
                     <Button variant='contained'>Add comment</Button>
                  </Link>
               </div>
               : <div className={styles.addCommentContainer}>
                  <CRUDCommentBtn onUpdateCommentList={(updateCommentList)} />
               </div>
         }
      </div>
   );
}

export default ViewMore;