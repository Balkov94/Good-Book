import styles from './Comment.module.css';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from 'react';
import { UserApi } from '../../Rest-APi-Client/client';
import { IQuestionAuthorHeaderProps } from '../QuestionRoom/QuestionCard/QuestionCard';
import { IdType, TimeOfModificationType } from '../../Rest-APi-Client/shared-types';

export interface ICommentProps {
   // for sorting club or question
   id: IdType,
   discussionId: number,
   isClub: boolean,
   //for rendering with author and index
   content: string,
   orderIndex?: number,
   creatorId: number,
   timeOfCreation?:string,
   timeOfModification?:TimeOfModificationType
}

// i will need id,discussionId,isClub for DELETE,EDIT when got DB and Back-end
function Comment({ id, discussionId, isClub, creatorId, content, orderIndex }: ICommentProps) {
   //1. Fetch creator data for the Comment card
   // *** using JSON-server so need fetch all andsort than just single fetch by ID
   const [commentCreator, setCommentCreator] = useState<IQuestionAuthorHeaderProps | undefined>();
   useEffect(() => {
      UserApi.findAll()
         .then(res => {
            const user = res.find(user => user.id === creatorId);
            setCommentCreator(user);
         })
   }, [creatorId]);

   // 1.put content to useState -> when change content reRender comment
   // 2.By passed id to AddEditComment component update the comment in DB
   // ***  signle source is OK comment always comes from parent no handle operations there
   /// ** Parent component (ClubRoom) is responsible only for fething
   const [contant, setContant] = useState<string>(content);
   
   
   return (
      <div className={styles.commentContainer}>
         <div className={styles.commentHeader}>
            <div className={styles.commentImgUsername}>
               <Avatar alt="user" src={commentCreator?.userPic}
                  sx={{
                     // override avatarMui zIndex fix styles bug
                     'MuiAvatar-root': {
                        zIndex: 10,
                     }
                  }}
               />
               <h1>{`${commentCreator?.fname} ${commentCreator?.lname}`}</h1>
            </div>
            <div className={styles.commentDate}>
               <h1>Data: not integrated YET</h1>
               <h2>№: {orderIndex}</h2>
            </div>
         </div>
         <div className={styles.commentContent}>
            <p>{content}</p>
         </div>
         {/* rating icons => not itegrated */}
         <div className={styles.commentFooterActions}>
            <div className={styles.likesContainer}>
               <ThumbUpIcon />100
            </div>
            <div className={styles.likesContainer}>
               <ThumbDownIcon />15
            </div>

            {/*Edit comment in ReadingClubs->ClubRoom*/}


            
            <div className={styles.commentEditBtn}>
               {/* <AddComment btnAction='edit' commentId={id} /> */}
            </div>
         </div>

      </div >
   );
}

export default Comment;