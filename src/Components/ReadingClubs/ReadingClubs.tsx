import ClubCard, { IClubCard } from './ClubCard/ClubCard';
import styles from './ReadingClubs.module.css';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CreateClubForm, { IClubData } from './CreateClubForm/CreateClubForm';
import ClubRoom from './ClubRoom/ClubRoom';
import { Outlet } from 'react-router-dom';
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


   const [createClubMenu, setCreateClubMenu] = useState<boolean>(false);

   const toggleCreateClubMenu = () => {
      setCreateClubMenu(createClubMenu => !createClubMenu)
   }

   const handleCreateClub = (newClub: IClubData) => {
      console.log(newClub);

   }

   return (
      <>
         <div className={styles.bClubsMainContainer}>
            <div className={styles.listClubsContainer}>
               <h1>&#x1f4da; Book Clubs:</h1>
               <Button onClick={toggleCreateClubMenu} variant='contained' color="success">
                  <BookmarkAddIcon />Create Club
               </Button>

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
            <Outlet />

         </div>

         {
            // toggle Create Club Form
            createClubMenu &&
            <CreateClubForm
               onClose={toggleCreateClubMenu}
               onCreate={handleCreateClub}
            />
         }
      </>

   );
}

export default ReadingClubs;