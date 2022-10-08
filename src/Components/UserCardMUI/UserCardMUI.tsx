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
import { IRegisterData } from '../RegisterPage/RegisterForm/RegisterForm';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserApi } from '../../Rest-APi-Client/client';

interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}

interface IUserCardMUIProps {
   // user?: IUserCardMUIProps;
   user: IRegisterData;
   // handleDeleteUser?: (userID: number) => void;
   // handleEditUser?: (user: any) => void;
}
// export default function UserCardMUI({ user, handleDeleteUser, handleEditUser }: IUserCardMUIProps) {
export default function UserCardMUI({ user }: IUserCardMUIProps) {
   const [cardMenu, setCardMenu] = React.useState(false);
   const [editMode, setEditMode] = React.useState(false);
   // on/OFF option menu on card (menu->1.Edit 2.Delete)
   const navigate=useNavigate();
   const handleCardMenu = () => {
      setCardMenu(cardMenu => !cardMenu);
   }
   const handleDeleteUser = () => {
      UserApi.deleteById(user.id)
         .then(res => {
            console.log(res);
            // navigate("/AllUsers");
         })
   }

   return (
      <>
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
                     <Link to={`/AllUsers/Edit-form/${user.id}`}
                        state={user}
                     >
                        <p>Edit user</p>
                     </Link>

                     <p onClick={handleDeleteUser}>Delete user</p>
                  </div>
               )
            }
            <CardContent sx={{ fontSize: "16px" }}>
               <p style={{ paddingBottom: "10px", fontSize: "20px", color: "lightgreen" }}>
                  Status:{user?.status}
               </p>
               <p style={{ paddingBottom: "10px", fontSize: "20px", color: "green" }}>
                  Role: {user?.role}
               </p>
               <p style={{ paddingBottom: "10px", marginTop: "38px" }}>
                  Created on: {user?.timeOfCreation}
               </p>
               <p style={{ paddingBottom: "0px", marginBottom: "0px" }}>
                  Edited on:{user?.timeOfModification}
               </p>

            </CardContent>
         </Card>

      </>

   );
}
