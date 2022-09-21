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
import { Outlet } from 'react-router-dom';

// import {
//    createBrowserRouter,
//    RouterProvider,
//    Route,
// } from "react-router-dom";

// const router = createBrowserRouter([
//    {
//       path: "/",
//       element: <WelcomeCarousel/>,

//    },
//    {
//       path: "/QuestionRoom",
//       element: <QuestionRoom/>,
//       children: [
//          {
//            path: "/QuestionRoom/:questionID",
//            element:  <ViewMore/> ,
//          },
//        ],
//    },
//    {
//       path: "/ExchangerPage",
//       element:   <ExchangerPage/>,
//    },
//    {
//       path: "/ReadingClubs",
//       element: <ReadingClubs/>,
//    },
//    {
//       path: "/AboutUs",
//       element: <AboutUs />,
//    },
//    {
//       path: "/Login",
//       element:  <LoginPage />,
//    },
//    {
//       path: "/Register",
//       element: <RegisterPage />,
//    },
//    {
//       path: "/AllUsers",
//       element:   <AllUsersPage />,
//    },
//    {
//       path: "/MyProfile",
//       element: <MyProfile />,
//    },
// ]);

function App() {

   return (

     <></>

   );
}
export default App;



