import styles from './AboutUs.module.css';

function AboutUs() {
   return (  
      <div className={styles.aboutUsMainContainer}>
            <h1>About us</h1>
            <div className={styles.wordsWrapper}>
               <h2>CONNECTS</h2>
               <h2>HELPS</h2>
               <h2>GIVES</h2>
               <h2>APPRECIATE</h2>
            </div>
            <div className={styles.missionText}>
               <h3>Not just words - OUR MISSION</h3>
               <h3>Inspired by you and your passion for improvement</h3>
            </div>
            <div className={styles.finalImagesContainer}>
                  <div className={styles.imgContainer}>
                        <img src={require("./aboutPictures/betterPic.jpg")} alt="" />
                  </div>
                  <div className={styles.imgContainer}>
                        <img src={require("./aboutPictures/teamWork.jpg")} alt="" />
                  </div>
                  <div className={styles.imgContainer}>
                        <img src={require("./aboutPictures/team2.jpg")} alt="" />
                  </div>
            </div>
            
      </div>
   );
}

export default AboutUs;