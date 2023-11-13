import { Route, Routes } from "react-router-dom";
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
import CRUDQFormComponent from "./Components/QuestionRoom/CRUDQFormComponent/CRUDQFormComponent";
import IndexClubRoom from "./Components/ReadingClubs/IndexClubRoom/IndexClubRoom";
import ClubRoom from "./Components/ReadingClubs/ClubRoom/ClubRoom";
import CRUDClubForm from "./Components/ReadingClubs/CRUDClubForm/CRUDClubForm";
import CRUDBookFormComponent from "./Components/ExhcangerPage/CRUDBookForm/CRUDBookFormComponent";
import EditUsersFormComponent from "./Components/EditUsersComponent/EditUsersForm";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { RoleEnum, UserClass } from "./Rest-APi-Client/shared-types";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import ToastComponent from "./Components/ToastComponent/ToastComponent";
import Footer from "./Components/Footer/Footer";

export const guest = new UserClass(
   "guest",
   "fnGuest",
   "lnGuest",
   "guest",
   "guest123",
   "guest@mail",
   "0000000000",
   0,
   "data:image/jpeg;base64,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",
   "",
   0,
   "creation date",
   null,
)

interface IGuestUser {
   username: string,
   userPic: string,
}
const initial = {
   username: "guest",
   userPic: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAODw0PEA0NDxAPDw4QEA4NEBAQDxASFREWFxYSFRMYHSggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLjYBCgoKDg0OFRAPGi0fHR0rLS0tLSstKy0tKystKy0tKystKy0tKy0rLS0tKy0rLSsyKy0rKzc3LSsrLSsrKysrK//AABEIAOYA2wMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQUGAwQCB//EADQQAQACAQEFBQUIAgMAAAAAAAABAgMRBAUhMVESQWFxkVKBobHRBhMiMmJyweEjM0JT8P/EABgBAQEBAQEAAAAAAAAAAAAAAAADAgEE/8QAHBEBAQEAAwEBAQAAAAAAAAAAAAECAxExIUFR/9oADAMBAAIRAxEAPwD9EAelEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEOtNnvPLHefKsuduuY7TsmX/qv6OV6TXnEx+6Jj5nYgQl1wAAAAAAAAAAAAAAAAAAABCy2Ldc20tfWsd1Y/NPn0dd27u5XyRy41rPzlbaJa3+RuZcsOy0p+WsR49/q6pE20FqxMaTETHjxSArtq3VS2s0/Bbp/wAZ9yky0mtpraNJjnH8+TWK3fWxfeU7VY/yU41mOcx318W86/rOoo0vPTP3W4eP1h3iVk0gAAAAAAAAAAAAAAgFnurY6ZK3m0a/i0ieMTHD+1ng2LHjnWtI16zxl5txx/in99lihq3tST4hIMtAAAACNEgKHf8Au6NJzUjjH+yI749rzj5KKl5jlLdWjWJieUsVtmD7vJenszw8u5Xjv4ludfXTHniefCfg6PA6UyzHjHSVGe3sHPHli3n0nm6DoAAAAAAAAAAAC83J/qn99liqtw2/Dkr0tE+sf0tUNe1XPgAy6AAAAAAMv9o66Z4nrSPhq1DL/aO2uaI6Uj5t8frG/FUAukO2PPMc+MfFxAe6tonlL6eCJ05cHfHtHtesOO9vQIiUjoAAAAAAAD3bmy9nLp7dZj3xxj+V+zm7tmtktrW3Z7Gk6+OvCPg0cI79Uz4AMNAAAAAAIY3eebt5stu7taR5Rwa/NEzW0V0i3ZnSZ5RPcw8xprE84mYnzieKnGntACyYAAAD6pea8v6do2jwn3S844drAAaAAAAAAWm4bfiyR1is+kz9Vyzu6cnZzV/VE19eP8NEjv1TPgAw0AAAAAAi0sLe2s2nra0+stjvTL2MOW36ZiPOeEfGWMiFeOJ8gAqmAAAAAAsAHGgAAAAACtpiYmOcTEx5w0mxbZXLHDWJjTtR0Zt7dz5ezl07rxp7+cfyxudxrNaABFQAAAAB59uzfd4736Vn17gUW/d5Rl0x010rbW0zw1mOUQpz5j0SdRC3sAacAAAAAAWADjQAAAAAAVtMTExziYmPOBANTs+aMla2jvj0no6qfcWSdb07tO15SuHns6qsvcAHHQABQfaXavy4on9dvLuj/wB0X1uUsPnyze9r252mZn6fw3ifWN3qOYC6QAAAAAAACwAcaAAAAAAAfeDDOS0VjTWes6QCy3DX/ZP7Y+a4ePd+yfdVmJt2pmdZ0jSOT2PPq91WeADjoAAw2eul7x0vePS0txLO723TaJy5ovWazM3msxMTGvSe9vjvVY3FKAukAAAAAAAAsAHGgAAAAEAPfufF2suvdSJn3zw+rzYNmvk/LWZ8eUeq+3fsv3VNOdp42ljevjWY9QCKgAAAA4bbi+8x5Ke1WYdwGD8+feheb23Reb2yY47UW4zWOcT36KW1ZidJiYnpMaS9EsqFnT5AacAAAAAAWADjQIASh69m3dkycdOzXrfh6Qtdm3ZSnGY7U9bfRi6kakqo2fYsmTlXSPatwhabNumleNvxz48K+n1WEQlO7tamUViI4RGnkkGWgAAAAAAAEOG07HjyxpekW8eUx5S9ADO7ZuC0azit2o9m/C3ut3qfLitSdLVms9LRo3TlnwVyRpesWjxUnJf1i4/jDi/2z7P85xW0/Rfl7pUu0bPfHOl6TWfHlPlPKVJqVO5scgGnAAFgFYmZiI4zM6RDQ7DsFcURMxE377T3eEdIY1rpSTtV7Nuy9+M/gjrPP0WuzbBjx8YjW3tW4y9YldWtySISDLoAAAAAAAAAAAAAAAA+MmOLRMWrFonumNYfYCk2zcNZ447difZnWa/WFJtWyZMU6XpMePOs+9tnzekWiYmImJ5xMaw3N2MXErCC231uyMWl6fkmdJr7M+HgqlZZfqdnS53XXXNT3z8GjBLk9Vz4AMNAAAAAAAAAAAAAAAAAAAAAAPFviuuDLr7OrHgrx+VPfr//2Q==",
};
interface IContextType {
   user?: UserClass,
   initial?: IGuestUser,
}
export const logged = createContext<any>(guest);
// <type,Dispatch func to change the initial value>[init Value, func to change the init value -> proper way to create context with types]
export const token = createContext<[string, Dispatch<SetStateAction<string>>]>(['', () => {}]);

function App() {
   const [loggedUser, setLoggedUser] = useState<UserClass>(guest);
   const [authToken, setAuthToken] = useState<string>('');

   return (
      <div>
         <logged.Provider value={[loggedUser, setLoggedUser]}>
            <token.Provider value={[authToken, setAuthToken]}>
               <Header />
               <ToastComponent />
               <Routes>
                  <Route index element={<WelcomeCarousel />} />
                  <Route path="QuestionRoom" element={<QuestionRoom />} />
                  <Route path="QuestionRoom/:questionId" element={<ViewMore />} />
                  <Route path="QuestionRoom/createQuestion" element={<CRUDQFormComponent />} />
                  <Route path="QuestionRoom/:questionId/edit" element={<CRUDQFormComponent />} />
                  <Route path="ReadingClubs" element={<ReadingClubs />} >
                     <Route path="" element={<IndexClubRoom />} />
                     <Route path=":clubId" element={<ClubRoom />} />
                  </Route>
                  <Route path="ReadingClubs/Reading-Club-Form" element={<CRUDClubForm />} />
                  <Route path="ExchangePage" element={<ExchangerPage />} />
                  <Route path="ExchangePage/Book-Form" element={<CRUDBookFormComponent />} />
                  <Route path="AboutUs" element={<AboutUs />} />
                  <Route path="Login" element={<LoginPage />} />
                  <Route path="Register" element={<RegisterPage />} />
                  <Route path="AllUsers" element={<AllUsersPage />} />
                  <Route path="AllUsers/Edit-form:id" element={<EditUsersFormComponent />} />
                  <Route path="MyProfile" element={<MyProfile />} />
                  <Route path="*" element={<ErrorPage />} />
               </Routes>
               <Footer />
            </token.Provider>
         </logged.Provider>
      </div>
   );
}
export default App;



