import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ErrorPage.module.css';

function ErrorPage() {
   const navigate = useNavigate();
   const [seconds, setSeconds] = useState<number>(5);

   useEffect(() => {
      setTimeout(() => {
         navigate(-1);
      }, 5000)
   });

   useEffect(() => {
      setTimeout(() => {
         setSeconds(second=>second-1);
      }, 1000)
   });

   return (
      <div className={styles.errorPageMainContainer}>
         <h1><span >404</span> This page doesn't exist <span >{seconds}</span></h1>
         <div className={styles.imgContainer}>
            <img src={require("./errImgOPS.jpg")} alt="ops" />
         </div>
      </div>
   );
}

export default ErrorPage;