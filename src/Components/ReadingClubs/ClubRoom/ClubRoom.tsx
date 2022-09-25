import Comment, { ICommentProps } from '../../Comment/Comment';
import styles from './ClubRoom.module.css';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { IClubCard } from '../ClubCard/ClubCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { bookApi, clubApi, commentApi, UserApi } from '../../../Rest-APi-Client/client';
import { IQuestionAuthorHeaderProps } from '../../QuestionRoom/QuestionCard/QuestionCard';
import { promises } from 'stream';



function ClubRoom() {
   //1.Get passed by link status data from ClubCard
   //2.Fetch Club creator(user) by creatorId (JSON-server fetch all and sort, no Backend and BD)
   //3. Fetch all Participants !!!![]
   //4.Fetch all Banned !!!![]
   //5.Fetch comments
   const { id, name, interests, participants, banned, creatorId } = useLocation().state;

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

   return (
      <div className={styles.clubroomMainContainer}>
         <div className={styles.clubDataContainer}>
            <div className={styles.clubDataText}>
               <h1>{name}</h1>
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
            {
               clubComments?.map((c, index) => {
                  return (<Comment
                     key={c.id}
                     id={c.id}
                     discussionId={c.discussionId}
                     isClub={c.isClub}

                     creatorId={c.creatorId}
                     content={c.content}
                     orderIndex={index + 1}
                  />)
               })
            }
         </div>
      </div>


   );
}

export default ClubRoom;