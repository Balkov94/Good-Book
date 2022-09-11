import styles from "./UserDataContainer.module.css"
import { GenderEnum, RoleEnum, StatusEnum, UserClass } from "../../Rest-APi-Client/shared-types";
import AllUsersContainer from "../AllUsersContainer/AllUsersContainer";
import { IEditMode } from "../AllFormTypes/FormContainer";
import EditFormMUI from "../../MUIComponents/EditFormMUI/EditFormMUI";
import { Button } from "@mui/material";

interface IUserDataContainerProps {
   loggedUser: UserClass | undefined; //IFormData | UserClass(parent conditional rendering checkED)
   handleUserEdition(formData?: any): void;
   handleIslogged(): void;
   handleEditMode(): void;
   currEditMode: IEditMode;
}

function UserDataContainer({ loggedUser,
   handleUserEdition,
   handleIslogged,
   handleEditMode,
   currEditMode }: IUserDataContainerProps) {
   return (
      <>
         <div className={styles.dataContainer}>
            <h1>
               &#128075; Welcome, {loggedUser?.fname} - {RoleEnum[loggedUser!.role]}
            </h1>
            <div> <h2>Your profile:</h2></div>
            <div className={styles.data}>
               <p>First name: {loggedUser?.fname}</p>
               <p>Last name: {loggedUser?.lname}</p>
               <p>Username: {loggedUser?.username}</p>
               <p>Password: {loggedUser?.password}</p>
               <p>Gender: {GenderEnum[loggedUser!.gender]}</p>
               <p>Role: {RoleEnum[loggedUser!.role]}</p>
               <p>Status: {StatusEnum[loggedUser!.status]}</p>
               <p>Created on date: {loggedUser?.timeOfCreation}</p>
               <p>Last modification: {loggedUser?.timeOfModification === null ? "none" : loggedUser?.timeOfModification}</p>

               <p className={styles.descriptionP}>Description:
                  <span>{loggedUser!.description.trim() === "" ? " none" : (" " + loggedUser?.description.trim())}</span> </p>

               <div className={styles.profilePicContainer}>
                  <img className={styles.profilePic} src={loggedUser?.picture} alt="profile_picture" />
               </div>

            </div>
            <Button type="submit" variant="contained"
               sx={{ mt: 3, mb: 2 }}
               onClick={handleEditMode}
               className={styles.editProfileBtn}
            > edit profile</Button>
            <Button type="submit" variant="contained"
               sx={{ mt: 3, mb: 2 }}
               className={styles.logoutBtn}
               onClick={handleIslogged}
            >Logout</Button>
         </div>

         {currEditMode
            && (<EditFormMUI
               handleFormData={handleUserEdition}
               editUser={loggedUser}
               handleEditMode={handleEditMode}
            ></EditFormMUI>)
         }
         {/* element wrapper ->all users card + options to edit/delete them */}
         {
            (RoleEnum[loggedUser!.role] === "Admin" && loggedUser !== undefined)
            && <AllUsersContainer loggedUser={loggedUser}></AllUsersContainer>
         }

      </>
   );
}

export default UserDataContainer;