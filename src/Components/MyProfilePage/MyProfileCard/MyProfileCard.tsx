import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RoleEnum, StatusEnum, UserClass } from "../../../Rest-APi-Client/shared-types";
import styles from './MyProfileCard.module.css';

interface IMyProfileCard {
   loggedUser: UserClass,
}

function MyProfileCard({ loggedUser }: IMyProfileCard) {
   return (
      <div className={styles.MyProfileCardMainContainer}>
         <div className={styles.userTextDataContainer}>
            <div className={styles.userText}>
               <p>First name: {loggedUser.fname}</p>
               <p>Last name: {loggedUser.lname}</p>
               <p>Username: {loggedUser.username}</p>
               <p>Role: {RoleEnum[loggedUser.role]}</p>
               <p>Status: {StatusEnum[loggedUser.status]}</p>
               <p>Created on: {loggedUser.timeOfCreation}</p>
               <p>Last modification: {loggedUser.timeOfModification}</p>

               <p className={styles.descriptionP}>Description:
                  <span>{loggedUser!.description.trim() === "" ? " none" : (" " + loggedUser?.description.trim())}</span> </p>
               {/* <span>some desc or none</span> </p> */}
            </div>

            <div className={styles.profilePicContainer}>
               <img className={styles.profilePic} src={loggedUser.userPic} alt={loggedUser.fname} />
            </div>

         </div>
         {
            loggedUser.status == 1
            &&
            <Link to={`/AllUsers/Edit-form${loggedUser.id}`} state={loggedUser}>
               <Button variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className={styles.editProfileBtn}
               >  edit profile
               </Button>
            </Link>
         }


      </div>
   );
}

export default MyProfileCard;