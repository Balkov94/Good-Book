import styles from './ClubCard.module.css';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import { ClubClass, IdType } from '../../../Rest-APi-Client/shared-types';
import { useContext } from 'react';
import { logged } from '../../../App';

const chipColor = ["DarkSlateBlue", "CadetBlue", "DodgerBlue",
   "ForestGreen", "OrangeRed", "CornflowerBlue"];
export interface IClubCard {
   id: IdType,
   creatorId: string,
   name: string,
   interests: string[],
   participants: string[], banned: string[],

   onsignInToClub: (club: ClubClass) => void,
}

function ClubCard({ id, creatorId, name, interests, participants, banned, onsignInToClub }: IClubCard) {
   const [loggedUser, setLoggedUser] = useContext(logged);


   return (
      <div className={styles.bClubCardMainContainer}>
         <div className={styles.nameContainer}>{name}</div>
         <div className={styles.interestsContainer}>
            {
               interests.map((interest, index) => {
                  const randomNum = Math.floor(Math.random() * chipColor.length);
                  return <Chip key={`${interest}${index}`}
                     label={interest}
                     size="small"
                     variant="filled"
                     style={{ backgroundColor: `${chipColor[randomNum]}`, color: "white", fontWeight: "500" }} />
               })
            }
         </div>

         <div className={styles.membersContainer}>
            <SupervisedUserCircleIcon />
            {participants.length}
            {
               participants.includes(loggedUser.id)
                  ? (
                     <Link
                        to={`/ReadingClubs/club${id}`}
                        state={{ id, creatorId, name, interests, participants, banned }}>
                        <Button size="small" variant="contained" color="info">
                           Enter room
                        </Button>
                     </Link>
                  )
                  : (
                     <Button size="small" variant="contained" color="warning"
                        onClick={() => onsignInToClub({ id, creatorId, name, interests, participants, banned })}>
                        become a member
                     </Button>
                  )
            }
         </div>
      </div>
   );
}

export default ClubCard;