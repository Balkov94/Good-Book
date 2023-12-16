import Carousel from 'react-material-ui-carousel';
import { Paper} from '@mui/material';
import styles from './carousel.module.css';

export function WelcomeCarousel(props: any) {
   const items = [
      {
         name: "./bfind.jpg",
      },
      {
         name: "./bhelp.jpg",
      },
      {
         name: "./bproject.jpg",
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
      </Paper>
   )
}