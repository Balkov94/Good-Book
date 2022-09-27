import ClubCard, { IClubCard } from './ClubCard/ClubCard';
import styles from './ReadingClubs.module.css';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clubApi } from '../../Rest-APi-Client/client';

function ReadingClubs() {
   //1.Fetch all Reading clubs from DB
   const [clubsList, setClubsList] = useState<IClubCard[]>();
   useEffect(() => {
      clubApi.findAll()
         .then(res => {
            setClubsList(res);
         })
   }, [])

   return (
      <>
         <div className={styles.bClubsMainContainer}>
            <div className={styles.listClubsContainer}>
               <h1>&#x1f4da; Book Clubs:</h1>
               <Link to={"createClub"} >
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