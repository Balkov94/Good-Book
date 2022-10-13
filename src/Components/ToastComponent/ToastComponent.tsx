import { ToastContainer } from "react-toastify";


function ToastComponent() {

   return (
      <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={true}
         newestOnTop={true}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
         limit={2}
      />
   );
}

export default ToastComponent;