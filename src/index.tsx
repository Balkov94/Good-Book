import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
   createBrowserRouter,
   RouterProvider,
   Route,
   BrowserRouter,
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
import RouterRoot from './Components/RouterRoot/RouterRoot';

const router = createBrowserRouter([
   {
      path: "/",
      element:<><RouterRoot/></>,
      children: [
         {
            path: "/",
            element: <WelcomeCarousel />,
         },
         {
            path: "/Question Room",
            element: <QuestionRoom />,
            children: [
               {
                 
                  path: "QuestionRoom/:questionID",
                  element: <ViewMore />,
               },
            ],
         },
         {
            path: "/Reading Clubs",
            element: <ReadingClubs />,
         },
         {
            path: "/Exchange Page",
            element: <ExchangerPage />,
         },  
         {
            path: "/About Us",
            element: <AboutUs />,
         },
         {
            path: "/Login",
            element: <LoginPage />,
         },
         {
            path: "/Register",
            element: <RegisterPage />,
         },
         {
            path: "/All Users",
            element: <AllUsersPage />,
         },
         {
            path: "/My Profile",
            element: <MyProfile />,
         },

      ]

   },

]);
const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
