import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { WelcomeCarousel } from "../WelcomeCarousel/WelcomeCarousel";

function RouterRoot() {
   return (
      <>
         <Header />
         <Outlet/>
        
      </>

   );
}

export default RouterRoot;