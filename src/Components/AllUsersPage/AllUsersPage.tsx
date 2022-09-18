import UserCardMUI from '../UserCardMUI/UserCardMUI';
import styles from './AllUsers.module.css';


function AllUsersPage() {
   return (  
      <div className={styles.AllUsersWrapper}>
            <h1>Users list:</h1>
            <UserCardMUI/>
            <UserCardMUI/>
            <UserCardMUI/>
            <UserCardMUI/>
            <UserCardMUI/>
            
      </div>
   );
}

export default AllUsersPage;