import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ScrollToTopComponent from './Components/ScrollToTopComponent/ScrollToTopComponent';



const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(

   <React.StrictMode>
      <BrowserRouter>
      <ScrollToTopComponent/>
         <App />
      </BrowserRouter>
   </React.StrictMode>
);


