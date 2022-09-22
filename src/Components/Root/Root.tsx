import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { WelcomeCarousel } from "../WelcomeCarousel/WelcomeCarousel";

type ContextType = { function: any | null };


function RouterRoot() {


   

   return (
      <>
         <Header />
         <Outlet  context={test}/>
     
      </>

   );
}

export default RouterRoot;