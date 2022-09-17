import styles from './Comment.module.css';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
function Comment() {
   return (
      <div className={styles.commentContainer}>
         <div className={styles.commentHeader}>
            <div className={styles.commentImgUsername}>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               <h1>username long and stupid</h1>
            </div>
            <div className={styles.commentDate}>
               <h1>Data: 31.08.2022 14:55 UTC</h1>
               <h2>№:1</h2>
            </div>
         </div>
         <div className={styles.commentContent}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam nisi sunt minus tempora? Quasi, quidem quod, eum dicta enim architecto a quia ipsum ipsam, officiis pariatur maiores deserunt sequi.lorem
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odio aspernatur vel saepe recusandae modi rerum, reiciendis omnis eum ducimus perspiciatis facere vitae veniam quis dicta necessitatibus vero commodi? Minima!
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel fuga harum reprehenderit rem error. Consequatur velit alias reprehenderit non dolores expedita, debitis voluptate natus earum cumque ea. Incidunt, aliquid quia.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam deserunt dolore blanditiis sunt beatae voluptas. Esse corrupti, ut aperiam dolorem, natus in, nulla tempore perferendis beatae voluptatem tempora pariatur ipsum.
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. At ipsum esse, rem placeat fuga iure culpa blanditiis eos dolorum illo sunt doloribus iusto aliquid quod quo nihil eum, deserunt distinctio.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum natus autem est dolorum aspernatur, labore tempora, cupiditate sapiente animi odio perspiciatis vero a repellendus ea et laboriosam ex rem id?
            </p>
         </div>
         <div className={styles.commentFooterActions}>
            <div className={styles.likesContainer}>
               <ThumbUpIcon/>100
            </div>
            <div className={styles.likesContainer}>
               <ThumbDownIcon />15
            </div>
         </div>

      </div >
   );
}

export default Comment;