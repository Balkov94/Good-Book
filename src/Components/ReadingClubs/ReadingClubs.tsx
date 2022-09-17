import BookClubCard from './ClubCard/ClubCard';
import styles from './ReadingClubs.module.css';
import Button from '@mui/material/Button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useState } from 'react';
import CreateClubForm, { IClubData } from './CreateClubForm/CreateClubForm';
import ClubRoom from './ClubRoom/ClubRoom';

function ReadingClubs() {
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

               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
               <BookClubCard />
            </div>
            
            {
               //switch Club chats
               <ClubRoom />


            }
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