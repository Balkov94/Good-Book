import styles from './CRUDQFormComponent.module.css';
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
import { useLocation, useNavigate } from 'react-router-dom';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { TextareaAutosize } from '@mui/material';
import { useContext } from 'react';
import { QuestionClass } from '../../../Rest-APi-Client/shared-types';
import { commentApi, questionApi } from '../../../Rest-APi-Client/client';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

interface ILoginFormInputs {
   title: string,
   content: string,
   questionPic: string,
}

const schema = yup.object({
   title: yup.string().required().min(2).max(100),
   content: yup.string().required().min(2).max(512),
   questionPic: yup.lazy((value: any) =>
      /^data/.test(value)
         ? yup.string()
            .trim()
            .matches(
               /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
               'Must be a valid data URI',
            )
            .required()
         : (value.length > 0
            ? yup.string().trim().url('Must be a valid URL').required("Picture url is required!")
            : yup.string().notRequired())
   ),
}).required();

const theme = createTheme();
const LoginFormMUIOverride = {
   dispay: "flex",
   justifyContent: "center",
   alignItems: "center",
   maxWidth: "80%",
   minWidth: "80%",
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

export default function CRUDQFormComponent() {
   // get PROPS by Link-> state -> useLocation.state React-router
   const location = useLocation().state;
   let navigate = useNavigate();
   const [loggedUser, setLoggedUser] = useContext(logged);

   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<ILoginFormInputs>({
      defaultValues: {
         title: `${location?.title || ""}`,
         content: `${location?.content || ""}`,
         questionPic: `${location?.questionPic || ""}`
      },
      mode: "onChange",
      resolver: yupResolver(schema)

   });

   const sendSubmit = (data: ILoginFormInputs, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }
      const newQuestion = new QuestionClass(
         location?.id || undefined,
         location?.creatorId || loggedUser.id,
         data.title,
         data.content,
         `${data.questionPic === ""
            ? "data:image/png;base64,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"
            : data.questionPic}`
      );

      // Create Or Edit Question in the DB
      if (location !== null) {
         questionApi.update(newQuestion)
            .then((res) => {
               if (!res) {
                  throw Error();
               }
               navigate(-2);
               toast(`Updated question ${newQuestion.title}`, { type: "info" });
            }).catch((e) => {
               toast(`${"Edition was not successfull."}`, { type: "error" });
               toast.clearWaitingQueue();
            });
      }
      else {
         questionApi.create(newQuestion)
            .then((res) => {
               if (!res) {
                  throw new Error();
               }
               navigate(-1);
               toast("You published a new question", { type: "success" });
            }).catch((e) => {
               toast(`${"Creation was not successfull."}`, { type: "error" });
               toast.clearWaitingQueue();
            });
      }
   };

   const deleteQuestion = () => {
      // Delete all comment for curr Del Question

      commentApi.findAll()
         .then(allComments => {
            const commentForDelete = allComments.filter(c => c.discussionId === location.id);
            return commentForDelete;
         })
         .then(filtred => {
            filtred.forEach(c => commentApi.deleteById(c.id))
         }).catch(error => {
            console.log(error);
         })

      questionApi.deleteById(location.id)
         .then((res) =>{
            navigate(-2);
            if (!res) {
               throw new Error();
            }
         })
         .catch(error => {
            console.log(error);
            toast(`${"Deletion was not successfull."}`, { type: "error" });
            toast.clearWaitingQueue();
         })
   }

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="md" className={styles.mainFormWrapper}
            sx={{
               color: "white",
               pb: "60px",
               height: "fit-content",
               borderRadius: "15px",
               position: "relative",
               pt: "40px",

            }}>
            <CssBaseline />

            <Box
               sx={{
                  height: "fit-content",
                  marginTop: 8,
                  paddingBottom: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: "#1a1b1c ",
                  borderRadius: "15px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  border: "3px solid gray",
                  boxShadow: "0px 0px 25px 10px gray;"
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'lightblue' }}>
                  <ContactSupportIcon style={{ fontSize: "34px" }} />
               </Avatar>


               <Typography component="h1" variant="h5">
                  {
                     location !== null
                        ? ("✏️ Editing your question...")
                        : ("✍️ Write your question. The community will do the rest.")
                  }

               </Typography>

               <Box component="form"
                  onSubmit={handleSubmit(sendSubmit)}
                  sx={{

                     mt: 1,
                     ...LoginFormMUIOverride
                  }}
               >
                  <Controller
                     control={control}
                     name="title"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           fullWidth
                           autoFocus={true}
                           id="title"
                           label="Book title"
                           name="title"
                           placeholder='Book title'
                           value={value}
                           inputProps={{ maxLength: 100 }}
                           onChange={onChange}
                           error={errors.title?.message ? true : false}
                           helperText={errors.title?.message || ""}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="content"
                     render={({ field: { onChange, value } }) => (
                        <TextareaAutosize
                           aria-label="empty textarea"
                           placeholder="Type your question..."
                           style={{ height: 200 }}
                           className={styles.textarea}
                           id="content"
                           name="content"
                           value={value}
                           cols={35}
                           maxLength={512}
                           onChange={onChange}
                        />
                     )}
                  />
                  {
                     errors.content &&
                     <p style={{ color: "red" }}>{errors.content.message}</p>

                  }
                  <Controller
                     control={control}
                     name="questionPic"
                     render={({ field: { onChange, value } }) => (
                        <TextField
                           margin="normal"
                           id="questionPic"
                           label="Book cover image (URL)"
                           name="questionPic"
                           placeholder='Book cover image'
                           value={value}
                           type="search"
                           onChange={onChange}
                           style={{ width: "100%", minWidth: "120px" }}
                           error={errors.questionPic?.message ? true : false}
                           helperText={errors.questionPic?.message || ""}
                        />
                     )}
                  />

                  <Controller
                     control={control}
                     name="questionPic"
                     render={({ field: { onChange, value } }) => (
                        <img src={value}
                           id="questionPic"
                           onChange={onChange}
                           alt="cover"
                           style={{
                              display: `${value === "" ? "none" : "inline"}`,
                              width: "220px"
                           }}
                        />
                     )}
                  />


                  <Button type="submit" fullWidth variant="contained"
                     disabled={(isValid && isDirty) === false} sx={{ mt: "60px", mb: 2 }}
                  >
                     {location !== null ? "Save changes" : "Post question"}
                  </Button>


                  <Button variant="outlined" color="warning" fullWidth sx={{ mt: 0, mb: 2 }}
                     onClick={() => navigate(-1)}
                  >
                     cancel
                  </Button>
                  {
                     location !== null &&
                     <Button variant="contained" color="error" fullWidth sx={{ mt: 4, mb: 2 }}
                        onClick={deleteQuestion}
                     >
                        <DeleteOutlineIcon /> Delete question
                     </Button>

                  }
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}