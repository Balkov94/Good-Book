import styles from './AddComment.module.css';
import AddCommentForm from './AddcommentForm/AddCommentForm';
import { Button } from '@mui/material';
import { useState } from 'react';

function AddComment() {
   const [commentForm, setCommentForm] = useState(false);
   const toggleCommentForm = () => {
      setCommentForm(commentForm => !commentForm);
   }
   return (
      <>
         <Button className={styles.editClubBtn} variant="contained"
            onClick={toggleCommentForm}
         >Comment
         </Button>
         {
            commentForm
            &&
            (
               <div className={styles.addCommentMain}>
                  <AddCommentForm toggleForm={toggleCommentForm} />
               </div>
            )
         }
      </>

   );
}

export default AddComment;