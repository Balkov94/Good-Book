import styles from './AddComment.module.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import { ICommentProps } from '../Comment/Comment';
import AddCommentForm from './AddCommentForm/AddCommentForm';


interface IAddEditCommentBtn {
   onCreateComment: (newComment: ICommentProps) => void,
}

function AddComment({ onCreateComment }: IAddEditCommentBtn) {
   
   const [commentForm, setCommentForm] = useState(false);
   const toggleCommentForm = () => {
      setCommentForm(commentForm => !commentForm);
   }

   // using same toggleBtn and form - 1.Add comment 2.Edit comment
   return (
      <>
         <Button className={styles.editClubBtn} variant="contained" size="medium"
            onClick={toggleCommentForm}>
            comment
         </Button>
         {
            commentForm
            &&
            (
               <div className={styles.addCommentMain}>
                  <AddCommentForm
                     toggleForm={toggleCommentForm}
                     onCreateComment={onCreateComment}

                  />
               </div>
            )
         }
      </>

   );
}

export default AddComment;