import ExchangeBookContainer from './ExchangeBookContainer/ExchangeBookContainer';
import styles from './ExchangerPage.module.css';

function ExchangerPage() {
   return (
      <div className={styles.xPageMainContainer} >
         <div className={styles.topImgContainer}></div>
         <h6>Here you can find your new &#128214;. Just have to
            <span className={styles.clickIconSpan}> 
            <img src={require("./clickIcon.png")} alt="click icon" style={{width:"30px",marginRight:"8px"}}/>
            </span>
            and contact the owner &#129309;	
         </h6>

         <ExchangeBookContainer/>
      </div>
   );
}

export default ExchangerPage;