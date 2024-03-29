import Comment, { ICommentProps } from '../../Comment/Comment';
import styles from './ClubRoom.module.css';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { commentApi, UserApi } from '../../../Rest-APi-Client/client';
import { IQuestionAuthorHeaderProps } from '../../QuestionRoom/QuestionCard/QuestionCard';
import { Button } from '@mui/material';
import AddComment from '../../CRUDCommentBtn/CRUDCommentBtn';
import { logged } from '../../../App';

function ClubRoom() {
   //1.Get passed by link status data from ClubCard
   const location = useLocation().state;
   const { id, name, interests, participants, banned, creatorId } = location;
   const [loggedUser] = useContext(logged);
   const [clubCreator, setClubCreator] = useState<IQuestionAuthorHeaderProps>();
   const [participantsList, setParticipantsList] = useState<IQuestionAuthorHeaderProps[]>();
   const [bannedList, setBannedList] = useState<IQuestionAuthorHeaderProps[]>();
   const [clubComments, setClubComments] = useState<ICommentProps[]>();
   useEffect(() => {
      const fetchData = async () => {
         try {
            const [creatorRes, participantsRes, bannedRes, commentsRes] = await Promise.all([
               UserApi.findById(loggedUser.id),
               UserApi.findAll(),
               UserApi.findAll(),
               commentApi.findAll()
            ]);
   
            setClubCreator(creatorRes);
            
            const allParticipants = participantsRes.filter(c => participants.includes(c.id));
            setParticipantsList(allParticipants);
   
            const allBanned = bannedRes.filter(c => banned.includes(c.id));
            setBannedList(allBanned);
   
            const clubComments = commentsRes.filter(c => c.discussionId === id && c.isClub);
            setClubComments(clubComments);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };
   
      fetchData();
   }, [loggedUser.id, id, participants, banned]);


  
   // UI updater functions __________________________// 
   const updateCommentList = (currComment: ICommentProps) => {
      if (currComment.content === "_this_entity_was_deleted") {
         setClubComments(clubComments => {
            return (
               clubComments?.filter(c => c.id !== currComment.id)
            )
         })
      }
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
                     <h1>CLUB: {name} </h1>
                  </div>
                  <div>
                     {
                        (loggedUser.id === creatorId && loggedUser.status === 1)
                        &&
                        <Link to="/ReadingClubs/Reading-Club-Form"
                           state={{ id, name, interests, participants, banned, creatorId }}>
                           <Button className={styles.editClubBtn} variant="outlined" color="warning">
                              Edit
                           </Button>
                        </Link>
                     }
                  </div>
               </div>
               <div>
                  <h2>Members: &#128511;  {participants.length}</h2>
                  <h2>Club leader: 👑  {clubCreator?.username}</h2>
               </div>
            </div>

            <div className={styles.clubMembersWrapper}>
               {
                  participantsList?.map((p: IQuestionAuthorHeaderProps) => {
                     return (
                        <Tooltip key={`${p.username}${p.lname}`} title={p.username}>
                           <Avatar alt={p.username} src={p.userPic} />
                        </Tooltip>
                     )
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
                  <h2>Why don't you write one? 🤔</h2>
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