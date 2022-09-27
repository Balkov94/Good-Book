import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditFormMUI from '../../MUIComponents/EditFormMUI/EditFormMUI';
import styles from './UserCardMUI.module.css';
import { IFormData } from '../RegisterPage/RegisterForm/RegisterForm';
interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}

interface IUserCardMUIProps {
   // user?: IUserCardMUIProps;
   user?: IFormData;
   handleDeleteUser?: (userID: number) => void;
   handleEditUser?: (user: any) => void;
}
// export default function UserCardMUI({ user, handleDeleteUser, handleEditUser }: IUserCardMUIProps) {
export default function UserCardMUI({ user, handleDeleteUser, handleEditUser }: IUserCardMUIProps) {
   const [cardMenu, setCardMenu] = React.useState(false);
   const [editMode, setEditMode] = React.useState(false);
   // on/OFF option menu on card (menu->1.Edit 2.Delete)
   const handleCardMenu = () => {
      setCardMenu(cardMenu => !cardMenu);

   }
   // const onDelete = () => {
   //    let text = "Are you sure you want to delete this user?";
   //    // eslint-disable-next-line no-restricted-globals
   //    if (confirm(text) === true) {
   //       handleDeleteUser(user.id as number);
   //    }
   // }
   // // Open close EditForm (fixed form div)
   // const handleEditMode = () => {
   //    setEditMode(editMode => !editMode);
   //    setCardMenu(false);
   //    // if edit mode is on block scrolling
   //    blockScrolling(editMode)
   // }

   // const onEdit = (updatedUser: UserClass) => {
   //    UserApi.update(updatedUser)
   //       .then(user => {
   //          handleEditUser(user);
   //          // 1. close cad menu 2.close EditForm 3.on/off scroll
   //          setCardMenu(false);
   //          setEditMode(editMode => !editMode);
   //          // iff edit mode is on block scrolling
   //          if (editMode === false) {
   //             document.body.style.overflow = "hidden";
   //          }
   //          else {
   //             document.body.style.overflow = "visible";
   //          }
   //          return user;
   //       })
   //       .then(user => {
   //          alert(`***************************************************************************
   //                                 You edited ${user.username}'s profile.`)
   //       })
   //       .catch(err => alert(err))
   // hover effects

   //}
   //   <Avatar sx={{ bgcolor: `${user.gender > 1 ? red[300] : blue[800]}` }} aria-label="recipe">
   //   {( user.fname[0] + user.lname[0]).toUpperCase()}
   // </Avatar>
   return (
      <>
         {
            // editMode ?
            //    (<EditFormMUI
            //       editUser={user}
            //       handleFormData={onEdit}
            //       isAdminEdition={true}
            //       handleEditMode={handleEditMode}
            //       > </EditFormMUI>)
            //    :
            <Card sx={{
               zoom: "0.8",
               maxWidth: 345,
               paddingBottom: "20px", position: "relative",
               bgcolor: "black!important",
               border: "1px solid gray",
               boxShadow: "15px 15px 15px -2px gray",
               transition: "all 0.5s",
               color: "white",
               cursor: "default",
               '& MuiCardHeader-subheader': {
                  color: "white"
               },
               '& :hoover .MuiCard-root': {
                  border: "2px solid red"
               },
               '&:hover': {
                  boxShadow: "25px 25px 15px -2px rgb(171, 170, 170)",
                  transform: "scale(1.05)",
               },

            }}>

               <CardHeader sx={{
                  color: "white",
                  '& .MuiTypography-body2.MuiCardHeader-subheader': { opacity: "0.5" },
               }}
                  avatar={
                     // avatar color depends on user.gender
                     <Avatar sx={{ bgcolor: blue[800] }} aria-label="recipe">
                        {`${(user!.fname[0] + user!.lname[0]).toUpperCase()}`}
                     </Avatar>
                  }
                  action={
                     <IconButton aria-label="settings" onClick={handleCardMenu}>
                        <MoreVertIcon sx={{ color: "white", }} />
                     </IconButton>
                  }

                  titleTypographyProps={{
                     fontSize: "22px",
                     color: "white"
                  }}
                  subheaderTypographyProps={{
                     fontSize: "18px",
                     color: "white"
                  }}
                  title={user?.username}
                  subheader={`${user?.fname}  ${user?.lname}`}
               />
               <CardMedia
                  component="img"
                  height="194"
                  image={user?.userPic}
                  alt="User profile picture"
                  sx={{ width: '300px' }}
               />
               {
                  cardMenu &&
                  (
                     <div className={styles.cardMenu}>
                        <p >Edit user</p>
                        <p >Delete user</p>
                        {/* <p onClick={onDelete}>Delete user</p> */}
                     </div>
                  )
               }
               <CardContent sx={{ fontSize: "16px" }}>
                  <p style={{ paddingBottom: "10px" }}>Gender: userGender</p>
                  {/* <p style={{ paddingBottom: "10px",fontSize:"20px",color:`${user.status==1 ? "lightgreen":"gray"}`}} */}
                  <p style={{ paddingBottom: "10px", fontSize: "20px", color: "lightgreen" }}
                  >Status:{user?.status}</p>
                  <p style={{ paddingBottom: "10px", fontSize: "20px", color: "green" }}
                  >Role: {user?.role}</p>
                  <p style={{ paddingBottom: "10px", marginTop: "38px" }}>Created on: some date</p>
                  <p style={{ paddingBottom: "0px", marginBottom: "0px" }}>Edited on: other date</p>
                  {/* <p style={{ paddingBottom: "0px",marginBottom:"0px" }}>Edited on: {user.timeOfModification === null ? "none" : user.timeOfModification}</p> */}
               </CardContent>
            </Card>
         }
      </>

   );
}
