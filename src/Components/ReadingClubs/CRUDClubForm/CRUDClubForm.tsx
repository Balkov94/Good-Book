import styles from './CRUDClubForm.module.css';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { ClubClass } from '../../../Rest-APi-Client/shared-types';
import { clubApi} from '../../../Rest-APi-Client/client';
import { IClubCard } from '../ClubCard/ClubCard';
import { logged } from '../../../App';
import { useContext } from 'react';
import { toast } from 'react-toastify';


export interface ICreateClubFormInputs {
   clubName: string,
   interest1: string,
   interest2: string,
   interest3?: string,
   interest4?: string,
   interest5?: string,
   interest6?: string,
}


const schema = yup.object({
   clubName: yup.string().required("Required field.")
      .min(2, "Club name must be at least 2 characters.")
      .max(22),
   interest1: yup.string().required("You must write at least two interests for your club.")
      .min(2, "The word must be at least 2 characters.")
      .max(25),
   interest2: yup.string().required("You must write at least two interests for your club.")
      .min(2, "The word must be at least 2 characters.")
      .max(25),
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

export default function CRUDClubForm() {
   // 1.Get props from Link state, 
   //If not null ->  update / null - > create
   const location: IClubCard = useLocation().state;
   let navigate = useNavigate();
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<ICreateClubFormInputs>({
      defaultValues: {
         clubName: location?.name || "",
         interest1: location?.interests[0] || "",
         interest2: location?.interests[1] || "",
         interest3: location?.interests[2] || "",
         interest4: location?.interests[3] || "",
         interest5: location?.interests[4] || "",
         interest6: location?.interests[5] || "",
      },
      mode: "onChange",
      resolver: yupResolver(schema)
   });
   const [loggedUser, setLoggedUser] = useContext(logged);

   const sendSubmit = (data: ICreateClubFormInputs, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }

      const interestsArr = [data.interest1, data.interest2, data.interest3, data.interest4, data.interest5, data.interest6]
      const validInterests = interestsArr.filter(x => x !== "");
      const newClub = new ClubClass(
         location?.id || undefined,
         location?.creatorId || loggedUser.id,
         data.clubName,
         (validInterests as string[]),
         location?.participants || [loggedUser.id,],
         location?.banned || [],
      )
      // location!==null => update // create
      if (location) {
         clubApi.update(newClub)
            .then(() => {
               navigate("/ReadingClubs");
            })
            .catch(() => toast(`Operation fail`, { type: "error" }))
      }
      else {
         clubApi.create(newClub)
            .then(() => {
               toast(`Successful creation - ${newClub.name}`, { type: "success" });
               navigate(-1);
            })
            .catch(() => toast(`Deletion fail`, { type: "error" }))
      }
   };

   const onDelete = () => {
      clubApi.deleteById(location.id)
         .then(res => {
            navigate("/ReadingClubs");
            toast(`Successful deletion - ${location.name}`, { type: "success" });
         })
         .catch(() => toast(`Deletion fail`, { type: "error" }))
   }

   return (
      <ThemeProvider theme={theme}>
         <Container className={styles.mainContainer}>
            <CssBaseline />
            <Box
               sx={{
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
                  {
                     location ? `Edit ${location.name} club...` : "Creating Reading Club"
                  }
               </Typography>

               {/* FORM ______________________________________________________ */}
               {/* !!! Controller syntax without GENERIC factory function */}
               <Box component="form"
                  onSubmit={handleSubmit(sendSubmit)}
                  sx={{
                     mt: "20px",
                     mb: "100px",
                     border: "1px solid gray",
                     padding: "46px 26px 20px 26px",
                     width: "440px",
                     bgcolor: "black",
                     borderRadius: "10px",
                     position: "relative",
                     ...formsMUIoverride
                  }}
               >

                  <div className={styles.closeIconContainer} onClick={() => navigate(-1)}>
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
                           placeholder="&#128187; Front-end"
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
                           placeholder="🧩 Board games"
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
                     disabled={(isValid && isDirty) === false} sx={{ mt: 3, mb: 1 }}
                  >
                     {location ? "Save changed" : "Create club"}
                  </Button>
                  <Button fullWidth variant="outlined" color="secondary"
                     onClick={() => navigate(-1)} sx={{ mt: 1, mb: 3 }}
                  >
                     Cancel
                  </Button>
                  {
                     location &&
                     (
                        <Button fullWidth variant="contained" color="error"
                           onClick={onDelete} sx={{ mt: 1, mb: 3 }}
                        >
                           Delete reading club
                        </Button>

                     )


                  }

               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}