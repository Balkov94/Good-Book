import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/AllFormTypes/FormContainer';
import { WelcomeCarousel } from './Components/WelcomeCarousel/WelcomeCarousel';
import QuestionRoom from './Components/QuestionRoom/QuestionRoom';
import ViewMore from './Components/QuestionRoom/ViewMore/ViewMore';
import ExchangerPage from './Components/ExhcangerPage/ExchangerPage';
import AboutUs from './Components/AboutUs/AboutUs';
import ReadingClubs from './Components/ReadingClubs/ReadingClubs';
import CreateClubForm from './Components/ReadingClubs/CreateClubForm/CreateClubForm';
import MyProfile from './Components/MyProfilePage/MyProfile';
import AllUsersPage from './Components/AllUsersPage/AllUsersPage';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';


function App() {

   return (
      <>
         <Header></Header>
         <RegisterPage/>
         <LoginPage/>
         <AllUsersPage/>
         <MyProfile/>
         <ExchangerPage></ExchangerPage>
         <AboutUs/>
          <WelcomeCarousel></WelcomeCarousel>
         <QuestionRoom></QuestionRoom>
         <ViewMore></ViewMore> 
         {/* <ReadingClubs/> */}

         {/* <Footer></Footer> */}
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



