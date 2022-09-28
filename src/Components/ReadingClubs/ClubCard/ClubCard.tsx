import styles from './ClubCard.module.css';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';

// const chipColor = ["primary", "secondary", "warning", "success", "info"];
const chipColor = ["DarkSlateBlue", "CadetBlue", "DodgerBlue", "ForestGreen", "OrangeRed", "CornflowerBlue"];
export interface IClubCard {
   id: number,
   creatorId: number,
   name: string,
   interests: string[],
   participants: number[], //arr usersIds
   banned: number[]
}


function ClubCard({ id, creatorId, name, interests, participants, banned }: IClubCard) {
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
                  // color="primary" />
               })
            }
         </div>
         <div className={styles.membersContainer}>
            <SupervisedUserCircleIcon /> {participants.length}
            <Link
               to={`/ReadingClubs/:club${id}`}
               state={{ id, creatorId, name, interests, participants, banned }}>
               <Button size="small" variant="contained" color="info">Sign in</Button>
            </Link>
         </div>
      </div>
   );
}

export default ClubCard;