import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import styles from './carousel.module.css';

export function WelcomeCarousel(props: any) {
   const items= [
      {
         name: "./bfind.jpg",
      },
      {
         name: "./bproject.jpg",
      },
      {
         name: "./bhelp.jpg",
      },
      {
         name: "./bookBuddie.jpg",
      },
      {
         name: "./bexchange.jpg",
      },
      {
         name: "./communityImg.jpg",
      }
   ]

   // let size = window.innerWidth;
   // console.log(size);

   return (
      <Carousel
         navButtonsAlwaysInvisible={true}
         indicators={false}
         interval={3000}
         duration={2000}
         stopAutoPlayOnHover={false}
         className={styles.carousel}
      >
         {
            items.map((item, i) => <Item key={i} item={item} />)
         }
      </Carousel>

   )
}

function Item(props: any) {
   return (
      <Paper className={styles.paper}>
         <img className={styles.carouselImg}
            src={require(`${(props.item.name)}`)}
            alt="commercials" />
         {/* <h2>{props.item.name}</h2>
            <p>{props.item.description}</p> */}

         {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
      </Paper>
   )
}