import styles from './LoginForm.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IFormData } from "../../RegisterPage/RegisterForm/RegisterForm";
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../../ControllerTextFieldInput/ControllerTextFieldInput';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export interface ILoginFormProps {
   switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
   handleLoginData?: (formData?: Partial<IFormData>) => void;
}

interface ILoginFormInputs {
   username: string,
   password: string
}

const schema = yup.object({
   username: yup.string().required().min(5).max(15).matches(/^[a-zA-Z-0-9]+$/, "Only letters and numbers"),
   password: yup.string().required().min(8).max(15),
}).required();

const theme = createTheme();
export const formsMUIoverride = {
   dispay: "flex",
   justifyContent: "center",
   alignItems: "center",


   '& .MuiTextField-root': {
      bgcolor: "rgb(10,25,41)",
      marginBottom: "24px",
      zoom: "0.8",
   },
   '& .MuiInputBase-input': {
      // color: "white",
      fontSize: "20px",
      bgcolor: "rgb(10,25,41)",
   },
   '& .MuiInputBase-root': {
      color: "white",
   },
   '& > :not(style)': {
      color: "white"
   },
   // label + placeholder
   '& .MuiInputLabel-root': {
      fontSize: "22px",
      color: "gray",
   },
   //  border color
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: 'green',
      },
      '&:hover fieldset': {
         borderColor: '#ffc244',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'primary',
      },
      '&.MuiFormHelperText-root': {
         size: "medium",
         fontSize: "25px"
      },

   },
   '& .MuiButtonBase-root.Mui-disabled': {
      backgroundColor: "#5182b9",
      color: "white",
      opacity: "0.8"
   },
}

export default function LoginForm({ switchForm, handleLoginData }: ILoginFormProps) {
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<ILoginFormInputs>({
      defaultValues: { username: "", password: "" },
      mode: "onChange",
      resolver: yupResolver(schema)

   });


   const sendSubmit = (data: ILoginFormInputs, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }

      console.log(data);
      // handleLoginData(data);
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs" className={styles.mainFormWrapper}
            sx={{
               color: "white",
               pb:"60px",
               height:"fit-content",
               borderRadius:"15px",
               position:"relative",
               // border: "2px solid red",
               // bgcolor:"black",
               // zIndex:"1400",
            }}>
            <CssBaseline />
            <img src={require("../LoginPageImages/booksPile.png")} alt="booksPile" className={styles.absoluteImg1}/>
            <img src={require("../LoginPageImages/bulb.png")} alt="booksPile" className={styles.absoluteImg2}/>
            <Box
               sx={{
                  height: "560px",
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: "black",
                  borderRadius:"15px",
                  paddingLeft:"20px",
                  paddingRight:"20px",
                  border: "2px solid gray",
                  boxShadow: "0px 0px 25px 10px white;"
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: '#2286f7' }}>
                  <MeetingRoomIcon style={{ fontSize: "34px" }} />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Login
               </Typography>

               {/* FORM ______________________________________________________ */}
               {/* !!! Controller syntax without GENERIC factory function */}
               {/* PNG Absolute imgs */}
            

               <Box component="form"
                  onSubmit={handleSubmit(sendSubmit)}
                  sx={{
                     // border: "2px solid gray",
                     mt: 1,
                     ...formsMUIoverride
                  }}
               >
                  <Controller
                     control={control}
                     name="username"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           autoFocus={true}
                           id="username"
                           label="Username"
                           name="username"
                           placeholder='username'
                           value={value}
                           onChange={onChange}
                           error={errors.username?.message ? true : false}
                           helperText={errors.username?.message || ""}
                        />
                     )}
                  />
                  {/* one way to show errors (react-from-hook) */}
                  {/* <p>{errors.username?.message}</p> */}
                  <Controller
                     control={control}
                     name="password"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           id="password"
                           label="Password"
                           name="password"
                           placeholder='password'
                           value={value}
                           onChange={onChange}
                           error={errors.password?.message ? true : false}
                           helperText={errors.password?.message || ""}
                        />
                     )}
                  />

                  <Button type="submit" fullWidth variant="contained"
                     disabled={(isValid && isDirty) === false} sx={{ mt: "60px", mb: 2 }}
                  >  Login  </Button>
                   
                  <Button variant="contained" color="success" fullWidth sx={{ mt: 0, mb: 2 }}
                     onClick={switchForm}>
                     Don't have an account? Go to register!
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}