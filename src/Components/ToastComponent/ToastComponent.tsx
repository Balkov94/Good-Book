import { ToastContainer } from "react-toastify";


function ToastComponent() {

   return (
      <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
      />
   );
}

export default ToastComponent;