import styles from './IndexClubRoom.module.css';
import { useContext, useEffect, useState } from 'react';
import { clubApi, } from '../../../Rest-APi-Client/client';
import { IClubCard } from '../ClubCard/ClubCard';
import { Link, Outlet} from 'react-router-dom';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

function IndexClubRoom() {
   const [leaderList, setLeaderList] = useState<IClubCard[]>();
   const [memberList, setmemberList] = useState<IClubCard[]>();
   const [loggedUser, setLoggedUser] = useContext(logged);
   useEffect(() => {
      const leaderClubs: IClubCard[] = [];
      const memberClubs: IClubCard[] = [];
      clubApi.findAll()
         .then((clubs: IClubCard[]) => {
            clubs.forEach(club => {
               if (club.creatorId === loggedUser.id) {
                  leaderClubs.push(club)
               }
               else if (club.participants.includes(loggedUser.id)) {
                  memberClubs.push(club);
               }
            })
            setLeaderList(leaderClubs);
            setmemberList(memberClubs)
         })
         .catch(() => {
            toast("Operation fail", { type: "error" });
         })
   }, [loggedUser])

   return (
      <div className={styles.indexClubRoomMain}>
         <div className={styles.msgContainer}>
            👋 Welcome, {loggedUser.username}
         </div>
         <div className={styles.infContainer}>
            <h1> My participations:</h1>
            <div className={styles.clubColumnsContainer}>
               <div>
                  <h2> 👑 Club leader: </h2>
                  {
                     leaderList?.map((club, index) => {
                        const { id, creatorId, name, interests, participants, banned } = club;
                        return (
                           <Link key={club.id}
                              to={`/ReadingClubs/:club${club.id}`}
                              state={{ id, creatorId, name, interests, participants, banned }}>
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
                              state={{ id, creatorId, name, interests, participants, banned }}>
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