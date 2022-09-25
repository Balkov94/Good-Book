import styles from './IndexClubRoom.module.css';



function IndexClubRoom() {
   //1. Fetch logged user data
   //2. Render clubs in paritcipate


   return (
      <div className={styles.indexClubRoomMain}>
         <div className={styles.msgContainer}>
            Welcome, username
         </div>
         <div className={styles.infContainer}>
               <h1>My clubs:</h1>
               <h1>Leader of: club names sdsdsdsdasf  asf asf s fa f</h1>
               <h1>Member of: club names sdsdsdsdasf  asf asf s fa f</h1>
         </div>
      </div>
   );
}

export default IndexClubRoom;