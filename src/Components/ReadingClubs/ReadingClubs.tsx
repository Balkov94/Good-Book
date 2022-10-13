import ClubCard, { IClubCard } from './ClubCard/ClubCard';
import styles from './ReadingClubs.module.css';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clubApi } from '../../Rest-APi-Client/client';
import { ClubClass } from '../../Rest-APi-Client/shared-types';
import { logged } from '../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function ReadingClubs() {
   const [loggedUser, setLoggedUser] = useContext(logged);
   const [clubsList, setClubsList] = useState<ClubClass[]>([]);
   useEffect(() => {
      clubApi.findAll()
         .then(res => {
            setClubsList(res);
         })
         .catch(() => {
            toast("Signing fail", { type: "error" });
         })

   }, [])

   const signInToClub = (club: ClubClass) => {
      const participants = [...club.participants, loggedUser.id];
      const updatedClub = new ClubClass(
         club.id, club.creatorId, club.name, club.interests, participants, club.banned);

      fetch(`http://localhost:8000/api/ReadingClubs/${club.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(updatedClub)
      })
         .then(res => res.json())
         .then(res => {
            const copyClubList = clubsList.slice();
            const clubIndex = copyClubList.findIndex(c => c.id === club.id);
            copyClubList.splice(clubIndex, 1,updatedClub);
            setClubsList(copyClubList);

            console.log(res);
            toast("Signed in", { type: "success" });
         })
         .catch(res => {
            console.log(res);
            toast("Signing fail", { type: "error" });
         })

   }

   return (
      <>
         <div className={styles.bClubsMainContainer}>
            <div className={styles.listClubsContainer}>
               <h1>&#x1f4da; Book Clubs:</h1>
               <Link to={"Reading-Club-Form"} >
                  <Button variant='contained' color="success">
                     <BookmarkAddIcon />
                     Create Club
                  </Button>
               </Link>

               {
                  clubsList?.map(c => {
                     return <ClubCard key={c.id}
                        id={c.id}
                        name={c.name}
                        interests={c.interests}
                        participants={c.participants}
                        banned={c.banned}
                        creatorId={c.creatorId}

                        onsignInToClub={signInToClub}
                     />
                  })
               }

            </div>
            {/* Each club discussion room - ClubRoom */}
            <div className={styles.outletContainer}>
               <Outlet />
            </div>
         </div>
      </>

   );
}

export default ReadingClubs;