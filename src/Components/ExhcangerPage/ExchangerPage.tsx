import BooksWrapper from './BooksWrapper/BooksWrapper';
import styles from './ExchangerPage.module.css';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

function ExchangerPage() {
   return (
      <div className={styles.xPageMainContainer} >
         <div className={styles.topImgContainer}></div>
         <h6>Here you can find your new &#128214;. Just have to
            <span className={styles.clickIconSpan}>
               <img src={require("./ExchangerPageImgs/clickIcon.png")} alt="click icon" style={{ width: "30px", marginRight: "8px" }} />
            </span>
            and contact the owner &#129309;
         </h6>
         <div className={styles.addBookBtnContainer}>
            <Link to="/ExchangePage/Book-Form">
               <Button variant="contained">
                  <MenuBookIcon style={{ marginRight: "6px" }} />
                  Add book
               </Button>
            </Link>
         </div>
         <BooksWrapper />
      </div>
   );
}

export default ExchangerPage;