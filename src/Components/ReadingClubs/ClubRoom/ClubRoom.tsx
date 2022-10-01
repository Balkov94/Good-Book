import Comment, { ICommentProps } from '../../Comment/Comment';
import styles from './ClubRoom.module.css';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { commentApi, UserApi } from '../../../Rest-APi-Client/client';
import { IQuestionAuthorHeaderProps } from '../../QuestionRoom/QuestionCard/QuestionCard';
import { Button } from '@mui/material';
import AddComment from '../../CRUDCommentBtn/CRUDCommentBtn';


function ClubRoom() {
   //1.Get passed by link status data from ClubCard
   //2.Fetch Club creator(user) by creatorId (JSON-server fetch all and sort, no Backend and BD)
   //3. Fetch all Participants !!!![]
   //4.Fetch all Banned !!!![]
   //5.Fetch comments
   const { id, name, interests, participants, banned, creatorId } = useLocation().state;
   // console.log("check useLocation.state")
   // console.log(useLocation().state)

   const [clubCreator, setClubCreator] = useState<IQuestionAuthorHeaderProps>();
   const [participantsList, setParticipantsList] = useState<IQuestionAuthorHeaderProps[]>();
   const [bannedList, setBannedList] = useState<IQuestionAuthorHeaderProps[]>();
   const [clubComments, setClubComments] = useState<ICommentProps[]>();
   useEffect(() => {
      // ***simulate 3 real backend fetches by ID***
      const creator = UserApi.findAll(); //here shoudl be fetch by creatorId
      const allParticipants = UserApi.findAll(); //shoud be foreach id -> fetch user (mb with limit 5 users)
      const allBanned = UserApi.findAll(); // ...
      const comments = commentApi.findAll();
      Promise.all([creator, allParticipants, allBanned, comments])
         .then((res: any) => {
            creator.then(c => {
               const creator = c.find(c => c.id === creatorId);
               setClubCreator(creator);
               // console.log(creator);

            })

            allParticipants.then(c => {
               const allParticipants = c.filter(c => participants.includes(c.id));
               setParticipantsList(allParticipants);
               // console.log(allParticipants);
            })

            allBanned.then(c => {
               const allBanned = c.filter(c => banned.includes(c.id));
               setBannedList(allBanned);
               // console.log(allBanned);
            })

            comments.then((comments: ICommentProps[]) => {
               const filtred = comments.filter(c => c.discussionId === id && c.isClub);
               setClubComments(filtred);
            })
         })
   }, [creatorId, participants, banned, id])

   const navigate = useNavigate();

   // UI updater functions __________________________// 
   const updateCommentList = (currComment: ICommentProps) => {
      // delete from UI
      if (currComment.content === "_this_entity_was_deleted") {
         setClubComments(clubComments => {
            return (
               clubComments?.filter(c => c.id !== currComment.id)
            )
         })
      }
      // Update edited comment
      else {
         if (clubComments?.some(comment => comment.id === currComment?.id)) {
            setClubComments(clubComments => {
               return (
                  clubComments?.map(c => {
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
            setClubComments(clubComments => [...(clubComments || []), currComment]);
         }
      }
   }


   return (
      <div className={styles.clubroomMainContainer}>
         <div className={styles.clubDataContainer}>
            <div className={styles.clubDataText}>
               <div className={styles.titleAndBtns}>
                  <div>
                     <h1>Club name: {name} </h1>
                  </div>
                  <div>
                     <Button className={styles.editClubBtn} variant="contained">Edit</Button>
                     {/* <Button className={styles.editClubBtn} variant="contained">Delete</Button> */}
                  </div>
               </div>
               <div>
                  <h2>Club leader: {clubCreator?.username}</h2>
                  <h2>Members: {participants.length}</h2>
               </div>
            </div>

            <div className={styles.clubMembersWrapper}>
               {
                  participantsList?.map((p: IQuestionAuthorHeaderProps) => {
                     return <Tooltip key={`${p.username}${p.lname}`} title={p.username}>
                        <Avatar alt={p.username} src={p.userPic} />
                     </Tooltip>
                  })
               }
            </div>

         </div>

         <div className={styles.clubRoomCommentWrapper}>
            <div className={styles.discRommTitleContainer}>
               <h1>Discussion room 💬</h1>
            </div>
            {
               (clubComments === undefined || clubComments?.length < 1)
               &&
               (<div className={styles.noCommentsContainer}>
                  <h2>There aren't any comments.</h2>
                  <h2>Why don't you write the first one? 🤔</h2>
                  <div>
                     <img src={require("./ClubRoomImgs/ledArrow.png")} alt="arrow" />
                  </div>
               </div>
               )

            }
            {
               clubComments?.map((comment, index) => {
                  return (
                     <Comment
                        key={comment.id}
                        id={comment.id}
                        discussionId={comment.discussionId}
                        isClub={comment.isClub}
                        creatorId={comment.creatorId}
                        content={comment.content}
                        orderIndex={index + 1}
                        timeOfCreation={comment.timeOfCreation}
                        timeOfModification={comment.timeOfModification}

                        onUpdateCommentList={updateCommentList}
                     />
                  )
               })
            }
         </div>
         {/* add comment for ReadingClubs -> ClubRoom  */}
         <div className={styles.addCommentContainer}>
            <AddComment onUpdateCommentList={updateCommentList} />
         </div>

      </div>


   );
}

export default ClubRoom;