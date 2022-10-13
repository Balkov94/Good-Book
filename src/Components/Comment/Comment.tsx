import styles from './Comment.module.css';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useContext, useEffect, useState } from 'react';
import { UserApi } from '../../Rest-APi-Client/client';
import { IQuestionAuthorHeaderProps } from '../QuestionRoom/QuestionCard/QuestionCard';
import { IdType, TimeOfModificationType } from '../../Rest-APi-Client/shared-types';
import CRUDCommentBtn from '../CRUDCommentBtn/CRUDCommentBtn';
import { toast } from 'react-toastify';
import { logged } from '../../App';

export interface ICommentProps {
   // for sorting club or question
   id: IdType,
   discussionId: string,
   isClub: boolean,
   //for rendering with author and index
   content: string,
   orderIndex?: number,
   creatorId: string,
   timeOfCreation: string,
   timeOfModification: TimeOfModificationType
   // updater f
   onUpdateCommentList?: (comment: ICommentProps) => void,
}

function Comment({ id, discussionId, isClub, creatorId, content,
   orderIndex, timeOfCreation, timeOfModification, onUpdateCommentList }: ICommentProps) {

   const [loggedUser, setLoggedUser] = useContext(logged);
   const [commentCreator, setCommentCreator] = useState<IQuestionAuthorHeaderProps | undefined>();
   useEffect(() => {
      UserApi.findById(creatorId)
         .then(user => {
            setCommentCreator(user);
         })
         .catch(() => toast("Something went wrong", { type: "warning" }))

   }, [creatorId]);

   return (
      <div className={styles.commentContainer}>
         <div className={styles.commentHeader}>
            <div className={styles.commentImgUsername}>
               <Avatar alt="user" src={commentCreator?.userPic}
                  sx={{
                     'MuiAvatar-root': {
                        zIndex: "none",
                     }
                  }}
               />
               <h1 style={{ zIndex: "0" }}>{`${commentCreator?.fname} ${commentCreator?.lname}`}</h1>
            </div>
            <div className={styles.commentDate}>
               {
                  timeOfModification
                     ? <h1>Edited on:{timeOfModification}</h1>
                     : <h1>Created on:{timeOfCreation}</h1>

               }
               <h2>№: {orderIndex}</h2>
            </div>
         </div>
         <div className={styles.commentContent}>
            <p>{content}</p>
         </div>
         {/* rating icons => not itegrated */}
         <div className={styles.commentFooterActions}>
            <div className={styles.likesContainer}>
               <ThumbUpIcon />99
            </div>
            <div className={styles.likesContainer}>
               <ThumbDownIcon />1
            </div>

            {/*Edit comment in ReadingClubs-> ClubRoom*/}
            {
               loggedUser.id === creatorId
               &&
               <div className={styles.commentEditBtn}>
                  <CRUDCommentBtn
                     onUpdateCommentList={onUpdateCommentList}
                     editComment={{ id, discussionId, isClub, creatorId, content, timeOfCreation, timeOfModification }}
                  />
               </div>
            }
         </div>
      </div >
   );
}

export default Comment;