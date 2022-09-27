import UserCardMUI from '../UserCardMUI/UserCardMUI';
import styles from './AllUsers.module.css';
import {useEffect,useState} from 'react';
import { UserApi } from '../../Rest-APi-Client/client';
import { UserClass } from '../../Rest-APi-Client/shared-types';

function AllUsersPage() {
   // 1.!!! This page is visible only for Admin users
   // 2. Fetch all users
   const [allUsers, setAllUsers] = useState<UserClass[]>();
   useEffect(()=>{
      UserApi.findAll()
      .then(res=>{
         console.log(res)
         setAllUsers(res);
      })
   },[])
   return (  
      <div className={styles.AllUsersWrapper}>
            <h1>Users list:</h1>
            {
               allUsers?.map(user=>{
                  return  <UserCardMUI key={user.id} user={user}/>
               })
            }        
      </div>
   );
}

export default AllUsersPage;