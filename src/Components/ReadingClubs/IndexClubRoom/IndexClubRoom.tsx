import styles from './IndexClubRoom.module.css';
import { useEffect, useState } from 'react';
import { clubApi, } from '../../../Rest-APi-Client/client';
import { IClubCard } from '../ClubCard/ClubCard';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function IndexClubRoom() {
   //1. Fetch logged user data
   //2. Render clubs in paritcipate
   //!!! Fetch all clubs, make 2 arr (leader and member)
   //sort if creatorId===u.id [ush to leader] if member push to member and so on
   // lets expect user with ID===1 is logged one
   const [leaderList, setLeaderList] = useState<IClubCard[]>();
   const [memberList, setmemberList] = useState<IClubCard[]>();

   useEffect(() => {
      const loggedUserId = "1";
      const leaderClubs: any = [];
      const memberClubs: IClubCard[] = [];
      
      clubApi.findAll()
         .then((clubs: IClubCard[]) => {
            clubs.forEach(club => {
               if (club.creatorId === loggedUserId) {
                  leaderClubs.push(club)

               }
               else if (club.participants.includes(loggedUserId)) {
                  memberClubs.push(club);
               }
            })

            setLeaderList(leaderClubs);
            setmemberList(memberClubs)
         })
   }, [])

   let navigate = useNavigate();
   // const clickHandler = (event: any) => {
   //    event.preventDefault();
   //    // navigate("/ReadingClubs");
   //    navigate("/ReadingClubs/");
   // };

   return (
      <div className={styles.indexClubRoomMain}>
         <div className={styles.msgContainer}>
            👋 Welcome, Logged u.username
         </div>
         <div className={styles.infContainer}>
            <h1> My participation:</h1>
            <div className={styles.clubColumnsContainer}>
               <div>
                  <h2> 👑 Club leader: </h2>
                  {
                     leaderList?.map((club, index) => {
                        const { id, creatorId, name, interests, participants, banned } = club;
                        return (
                           <Link key={club.id}
                              to={`/ReadingClubs/:club${club.id}`}
                              state={{ id, creatorId, name, interests, participants, banned }}
                           >
                              <p>{`${index + 1}.${club.name}`}</p>
                           </Link>
                        )
                     })
                  }
               </div>

               <div>
                  <h2>&#128511; Member:</h2>
                  {
                     memberList?.map((club, index) => {
                        const { id, creatorId, name, interests, participants, banned } = club;
                        return (
                           <Link key={club.id}
                           to={`/ReadingClubs/:club${club.id}`}
                           state={{ id, creatorId, name, interests, participants, banned }}
                        >
                           <p>{`${index + 1}.${club.name}`}</p>
                        </Link>
                        )
                     })
                  }

               </div>
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default IndexClubRoom;