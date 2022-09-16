import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/AllFormTypes/FormContainer';
import { WelcomeCarousel } from './Components/WelcomeCarousel/WelcomeCarousel';
import QuestionRoom from './Components/QuestionRoom/QuestionRoom';
import ViewMore from './Components/QuestionRoom/ViewMore/ViewMore';
import ExchangerPage from './Components/ExhcangerPage/ExchangerPage';
import AboutUs from './Components/AboutUs/AboutUs';
import BookClubs from './Components/ReadingClubs/ReadingClubs';
import CreateClubForm from './Components/ReadingClubs/CreateClubForm/CreateClubForm';


function App() {

   return (
      <>
         <Header></Header>
         
         <BookClubs/>
         {/* <AboutUs/>
          <WelcomeCarousel></WelcomeCarousel>
         <QuestionRoom></QuestionRoom>
         <ExchangerPage></ExchangerPage>
         <ViewMore></ViewMore>  */}

         <Footer></Footer>
      </>




      // users administration
      //  <div className={style.mainAppDiv}>
      //       <Header></Header>
      //       <FormContainer></FormContainer>
      //       <Footer></Footer>                           
      //  </div>

   );
}
export default App;



