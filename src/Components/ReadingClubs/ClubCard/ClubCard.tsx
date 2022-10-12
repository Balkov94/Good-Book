import styles from './ClubCard.module.css';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import { IdType } from '../../../Rest-APi-Client/shared-types';
import { useContext } from 'react';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

const chipColor = ["DarkSlateBlue", "CadetBlue", "DodgerBlue",
   "ForestGreen", "OrangeRed", "CornflowerBlue"];
export interface IClubCard {
   id: IdType,
   creatorId: string,
   name: string,
   interests: string[],
   participants: string[], //arr usersIds
   banned: string[]
}

function ClubCard({ id, creatorId, name, interests, participants, banned }: IClubCard) {
   const [loggedUser, setLoggedUser] = useContext(logged);

   const toastMsg = () => {
      toast("You are not a member!", { type: "warning" })
   }

   const signIn = () => {
      fetch(`http://localhost:8000/api/ReadingClubs/${id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(
            {
               // id, creatorId, name, interests, banned,
               // participants.push(loggedUser.id)
            })
      })
   }


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
                        <Button size="small" variant="contained" color="info">Enter club room</Button>
                     </Link>
                  )
                  : (
                     <Button size="small" variant="contained" color="success">Sign in</Button>
                  )
            }
         </div>
      </div>
   );
}

export default ClubCard;