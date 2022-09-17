import Comment from '../../Comment/Comment';
import styles from './ClubRoom.module.css';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
function ClubRoom() {
   return (

      <div className={styles.clubroomMainContainer}>
         <div className={styles.clubDataContainer}>
            <div className={styles.clubDataText}>
               <h1>Reading club name</h1>
               <div>
                  <h2>Club leader: Some Very smar username</h2>
                  <h2>Members: 299</h2>
               </div>
            </div>
            <div className={styles.clubMembersWrapper}>
               <Tooltip title="user name">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               </Tooltip>
               <Tooltip title="user name">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               </Tooltip>
               <Tooltip title="user name">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               </Tooltip>
               <Tooltip title="user name">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               </Tooltip>    
            </div>

         </div>

         <div className={styles.clubRoomCommentWrapper}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
         </div>
      </div>


   );
}

export default ClubRoom;