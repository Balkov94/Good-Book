import {
   Routes,
   Route,
   Outlet,
} from "react-router-dom";

import { WelcomeCarousel } from './Components/WelcomeCarousel/WelcomeCarousel';
import QuestionRoom from './Components/QuestionRoom/QuestionRoom';
import ViewMore from './Components/QuestionRoom/ViewMore/ViewMore';
import ExchangerPage from './Components/ExhcangerPage/ExchangerPage';
import ReadingClubs from './Components/ReadingClubs/ReadingClubs';
import AboutUs from './Components/AboutUs/AboutUs';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import AllUsersPage from './Components/AllUsersPage/AllUsersPage';
import MyProfile from './Components/MyProfilePage/MyProfile';
import Header from './Components/Header/Header';
import RouterRoot from './Components/Root/Root';

// const router = createBrowserRouter([
//    {
//       path: "/",
//       element: <><RouterRoot /></>,
//       children: [
//          {
//             path: "/",
//             element: <WelcomeCarousel />,
//          },
//          {
//             path: "/Question Room",
//             element: <QuestionRoom />,
//             children: [
//                {

//                   path: "QuestionRoom/:questionID",
//                   element: <ViewMore />,
//                },
//             ],
//          },
//          {
//             path: "/Reading Clubs",
//             element: <ReadingClubs />,
//          },
//          {
//             path: "/Exchange Page",
//             element: <ExchangerPage />,
//          },
//          {
//             path: "/About Us",
//             element: <AboutUs />,
//          },
//          {
//             path: "/Login",
//             element: <LoginPage />,
//          },
//          {
//             path: "/Register",
//             element: <RegisterPage />,
//          },
//          {
//             path: "/All Users",
//             element: <AllUsersPage />,
//          },
//          {
//             path: "/My Profile",
//             element: <MyProfile />,
//          },

//       ]

//    },

// ]);


function App() {

   return (
      <div>
         <Header />
      </div>

   );
}
export default App;



