import UserCardMUI from '../UserCardMUI/UserCardMUI';
import styles from './AllUsers.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserApi } from '../../Rest-APi-Client/client';
import { IdType, UserClass } from '../../Rest-APi-Client/shared-types';
import { logged } from '../../App';

function AllUsersPage() {
   // 1.!!! This page is visible only for Admin users
   // 2. Fetch all users
   const [loggedUser, setLoggedUser] = useContext(logged);
   const [allUsers, setAllUsers] = useState<UserClass[]>();
   useEffect(() => {
      UserApi.findAll()
         .then(res => {
            const filtred = res.filter(u => u.id !== loggedUser.id)
            setAllUsers(filtred);
         })
   }, [loggedUser])

   const handleDeleteUser = (forDelId: IdType) => {
      UserApi.deleteById(forDelId)
         .then(res => {
            const filtred = allUsers?.filter(user => user.id !== forDelId)
            setAllUsers(filtred);
         })
   };

   return (
      <div className={styles.AllUsersWrapper}>
         <h1>Users list:</h1>
         {
            allUsers?.map(user => {
               return <UserCardMUI key={user.id} user={user} onDelete={handleDeleteUser} />
            })
         }
      </div>
   );
}

export default AllUsersPage;