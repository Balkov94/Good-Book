import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ClubRoom from './Components/ReadingClubs/ClubRoom/ClubRoom';
import IndexClubRoom from './Components/ReadingClubs/IndexClubRoom/IndexClubRoom';
import CreateClubForm from './Components/ReadingClubs/CreateClubForm/CreateClubForm';
import AddComment from './Components/CRUDCommentBtn/CRUDCommentBtn';
import CRUDQFormComponent from './Components/QuestionRoom/CRUDQFormComponent/CRUDQFormComponent';


const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(

   <React.StrictMode>
      <BrowserRouter>
         <App />
         <Routes>
            <Route index element={<WelcomeCarousel />} />

            <Route index element={<WelcomeCarousel />} />
            {/* CARE WITH -> : / and open close tag of <Route> */}
            <Route path="QuestionRoom" element={<QuestionRoom />} />
            <Route path="QuestionRoom/:questionId" element={<ViewMore />} />
            <Route path="QuestionRoom/createQuestion" element={<CRUDQFormComponent />} />
            <Route path="QuestionRoom/:questionId/edit" element={<CRUDQFormComponent />} />
            
            <Route path="ReadingClubs" element={<ReadingClubs />} >
               <Route path="" element={<IndexClubRoom />} />
               <Route path=":clubId" element={<ClubRoom />} />
            </Route>
            <Route path="ReadingClubs/createClub" element={<CreateClubForm />} />
            <Route path="ExchangePage" element={<ExchangerPage />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="Register" element={<RegisterPage />} />
            <Route path="AllUsers" element={<AllUsersPage />} />
            <Route path="MyProfile" element={<MyProfile />} />
            <Route path="*" element={<h1 style={{ color: "red", textAlign: "center", fontSize: "40px" }}>Error 404</h1>} />
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
