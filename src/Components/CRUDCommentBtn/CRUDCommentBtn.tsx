import styles from './CRUDCommentBtn.module.css';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { ICommentProps } from '../Comment/Comment';
import AddCommentForm from './AddCommentForm/AddCommentForm';
import { CommentClass } from '../../Rest-APi-Client/shared-types';
import EditCommentForm from './EditCommentForm/EditCommentForm';
import { logged } from '../../App';
interface IAddEditCommentBtn {
   onUpdateCommentList?: (newComment: ICommentProps) => void,
   // if id and content passed -> Edit
   editComment?: CommentClass,
}

function AddComment({ onUpdateCommentList, editComment }: IAddEditCommentBtn) {
   const [commentForm, setCommentForm] = useState(false);
   const toggleCommentForm = () => {
      setCommentForm(commentForm => !commentForm);
   }

   const [loggedUser, setLoggedUser] = useContext(logged);

   // using same toggleBtn and form - 1.Add comment 2.Edit comment
   return (
      <>
         {/* Btns switch text for Add / Edit */}
         {
            editComment === undefined
               ? (
                  <Button className={styles.editClubBtn} variant="contained" size="medium"
                     disabled={loggedUser.status == 2}
                     onClick={toggleCommentForm}>
                     comment
                  </Button>
               )
               : (
                  <Button className={styles.editClubBtn} variant="contained" size="small" color="info"
                     disabled={loggedUser.status == 2}
                     onClick={toggleCommentForm}>
                     edit
                  </Button>
               )
         }
         {
            // form for add comment
            (commentForm && editComment === undefined && onUpdateCommentList !== undefined)
            &&
            (<div className={styles.mainFormContainer}>
               <AddCommentForm
                  toggleForm={toggleCommentForm}
                  onUpdateCommentList={onUpdateCommentList} />
            </div>)
         }
         {
            // form for EDIT/DELETE comment
            (commentForm && editComment !== undefined && onUpdateCommentList !== undefined)
            &&
            (<div className={styles.mainFormContainer}>
               <EditCommentForm
                  toggleForm={toggleCommentForm}
                  editComment={editComment}
                  onUpdateCommentList={onUpdateCommentList} />
            </div>)
         }
      </>
   );
}

export default AddComment;