import styles from './CreateClubForm.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';




export interface IClubData {
   clubName: string,
   interest1: string,
   interest2: string,
   interest3?: string,
   interest4?: string,
   interest5?: string,
   interest6?: string,
}
// !!! used before reacrt router
// interface ICreateClubProps {
//    onClose: () => void,
//    onCreate: (newClub: IClubData) => void,
// }

const schema = yup.object({
   clubName: yup.string().required("Required field.")
      .min(2, "Club name must be at least 2 characters.")
      .max(22).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   interest1: yup.string().required("You must write at least two interests for your club.")
      .min(2, "The word must be at least 2 characters.")
      .max(25).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   interest2: yup.string().required("You must write at least two interests for your club.")
      .min(2, "The word must be at least 2 characters.")
      .max(25).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   interest3: yup.string().max(25).test(
      'empty-or-2-characters-check',
      'The word must be at least 2 characters',
      interest => !interest || interest.length >= 2,
   ),
   interest4: yup.string().max(25).test(
      'empty-or-2-characters-check',
      'The word must be at least 2 characters',
      interest => !interest || interest.length >= 2,
   ),
   interest5: yup.string().max(25).test(
      'empty-or-2-characters-check',
      'The word must be at least 2 characters',
      interest => !interest || interest.length >= 2,
   ),
   interest6: yup.string().max(25).test(
      'empty-or-2-characters-check',
      'The word must be at least 2 characters',
      interest => !interest || interest.length >= 2,
   ),

}).required();

const theme = createTheme();
 const formsMUIoverride = {
   dispay: "flex",
   justifyContent: "center",
   alignItems: "center",
   // '& .MuiContainer-root':{
   //    maxWidth:"100%",
   // },

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

export default function CreateClubForm() {
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<IClubData>({
      defaultValues: {
         clubName: "",
         interest1: "",
         interest2: "",
         interest3: "",
         interest4: "",
         interest5: "",
         interest6: "",
      },
      mode: "onChange",
      resolver: yupResolver(schema)

   });
   const sendSubmit = (data: IClubData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }
      console.log(data);

      // onCreate(data);
   };
   // back button(used in X to close create Form)
   const navigate=useNavigate();
   return (
      <ThemeProvider theme={theme}>
         <Container className={styles.mainContainer}>
            <CssBaseline />
            <Box
               sx={{
                  // border: "1px solid green",
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ bgcolor: '#2286f7' }}>
                  <span>&#128218;</span>
               </Avatar>
               <Typography component="h1" variant="h5">
                  Creating Reading Club
               </Typography>

               {/* FORM ______________________________________________________ */}
               {/* !!! Controller syntax without GENERIC factory function */}
               <Box component="form"
                  onSubmit={handleSubmit(sendSubmit)}
                  sx={{
                     mt:"20px",
                     mb: "100px",
                     border: "1px solid gray",
                     padding: "46px 26px 20px 26px",
                     width: "440px",
                     bgcolor: "black",
                     borderRadius: "10px",
                     position:"relative",
                     ...formsMUIoverride
                  }}
               >

                  <div className={styles.closeIconContainer} onClick={()=>navigate(-1)}>
                     <CloseIcon />
                  </div>

                  <Controller
                     control={control}
                     name="clubName"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           autoFocus={true}
                           id="clubName"
                           label="Club name:"
                           name="clubName"
                           placeholder="Club name"
                           value={value}
                           onChange={onChange}
                           error={errors.clubName?.message ? true : false}
                           helperText={errors.clubName?.message || ""}
                        />
                     )}
                  />
                  <div className={styles.textInstructions}>
                     <h3>Club interests:</h3>
                     <p>Write 2 or more interests.</p>
                     <p>This will help you find the perfect Book Buddies.</p>
                  </div>
                  <Controller
                     control={control}
                     name="interest1"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           id="interest1"
                           name="interest1"
                           placeholder=" &#128187; Front-end"
                           value={value}
                           onChange={onChange}
                           error={errors.interest1?.message ? true : false}
                           helperText={errors.interest1?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="interest2"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth                         
                           id="interest2"                          
                           name="interest2"
                           placeholder="🧩 Boardgames"
                           value={value}
                           onChange={onChange}
                           error={errors.interest2?.message ? true : false}
                           helperText={errors.interest2?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="interest3"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth                       
                           id="interest3"                  
                           name="interest3"
                           placeholder="👨‍🏫 Languages"
                           value={value}
                           onChange={onChange}
                           error={errors.interest3?.message ? true : false}
                           helperText={errors.interest3?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="interest4"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth                       
                           id="interest4"                        
                           name="interest4"
                           placeholder="&#9917; Football"
                           value={value}
                           onChange={onChange}
                           error={errors.interest4?.message ? true : false}
                           helperText={errors.interest4?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="interest5"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           id="interest5"                       
                           name="interest5"
                           placeholder="💃 Dancing"
                           value={value}
                           onChange={onChange}
                           error={errors.interest5?.message ? true : false}
                           helperText={errors.interest5?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="interest6"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           id="interest6"
                           name="interest6"
                           placeholder="📷 Photography"
                           value={value}
                           onChange={onChange}
                           error={errors.interest6?.message ? true : false}
                           helperText={errors.interest6?.message || ""}
                        />
                     )}
                  />

                  <Button type="submit" fullWidth variant="contained"
                     disabled={(isValid && isDirty) === false} sx={{ mt: 3, mb: 2 }}
                  >
                     Create Club
                  </Button>

               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}