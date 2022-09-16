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
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';





interface IClubInterests {
   interestname: string
}
export interface IClubData {
   clubName: string,
   // clubInterests: string,
}
interface ICreateClubProps {
   onClose: () => void,
   onCreate: (newClub: IClubData) => void,
}

const schema = yup.object({
   clubName: yup.string().required("Required field.")
      .min(2, "Club name must be at least 2 characters.")
      .max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
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

export default function CreateClubForm({ onClose, onCreate }: ICreateClubProps) {
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<IClubData>({
      defaultValues: { clubName: "" },
      mode: "onChange",
      resolver: yupResolver(schema)

   });


   const sendSubmit = (data: IClubData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }
      onCreate(data);
   };

   return (
      <ThemeProvider theme={theme}>
         <Container className={styles.mainContainer}>
            <CssBaseline />
            <Box
               sx={{
                  // m:2,
                  border:"1px solid green",
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor:"black",
               }}
            >
               <Avatar sx={{ bgcolor: '#2286f7' }}>
                  <MeetingRoomIcon style={{ fontSize: "34px" }} />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Create Book Club
               </Typography>

               {/* FORM ______________________________________________________ */}
               {/* !!! Controller syntax without GENERIC factory function */}
               <Box component="form"
                  onSubmit={handleSubmit(sendSubmit)}
                  sx={{
                     m:2,
                     mt:6,
                     mb:6,
                     border:"1px solid red",
                     width:"360px",
                     ...formsMUIoverride
                  }}
               >
                  <Controller
                     control={control}
                     name="clubName"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           autoFocus={true}
                           id="clubName"
                           label="clubName"
                           name="clubName"
                           placeholder="clubName"
                           value={value}
                           onChange={onChange}
                           error={errors.clubName?.message ? true : false}
                           helperText={errors.clubName?.message || ""}
                        />
                     )}
                  />
                  {/* //one way to show errors (react-from-hook) */}
                  {/* <p>{errors.username?.message}</p>
                  <ControllerTextFieldInput
                     control={control}
                     name="password"
                     label='Password'
                     type="password"
                     error={errors.password?.message}
                  /> */}
                  <Button type="submit" fullWidth variant="contained"
                     disabled={(isValid && isDirty) === false} sx={{ mt: 3, mb: 2 }}
                  >
                     Create
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}