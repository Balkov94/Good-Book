import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/AllFormTypes/FormContainer';
import { WelcomeCarousel } from './Components/WelcomeCarousel/WelcomeCarousel';
import QuestionRoom from './Components/QuestionRoom/QuestionRoom';


function App() {

   return (
      <>
         <Header></Header>
         {/* <WelcomeCarousel></WelcomeCarousel> */}
         <QuestionRoom></QuestionRoom>
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



