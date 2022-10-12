import styles from './AddCommentForm.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { CommentClass } from '../../../Rest-APi-Client/shared-types';
import { useParams } from 'react-router-dom';
import { commentApi } from '../../../Rest-APi-Client/client';
import { ICommentProps } from '../../Comment/Comment';
import { useContext } from 'react';
import { logged } from '../../../App';
import { toast } from 'react-toastify';

interface IAddCommentFormInputs {
   content: string,
}

const schema = yup.object({
   content: yup.string().required().min(1).max(1000),
}).required();


const theme = createTheme();
const formsMUIoverride = {
   dispay: "flex",
   justifyContent: "center",
   alignItems: "center",
   maxWidth: "90%",
   minWidth: "90%",

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

interface IAddCommentFormProps {
   toggleForm(): void,
   onUpdateCommentList: (newComment: ICommentProps) => void,
}

export default function AddCommentForm({ toggleForm, onUpdateCommentList }: IAddCommentFormProps) {
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<IAddCommentFormInputs>({
      defaultValues: { content: "" },
      mode: "onChange",
      resolver: yupResolver(schema)

   });

   const params = useParams();
   const [loggedUser, setLoggedUser] = useContext(logged);

   const sendSubmit = (data: IAddCommentFormInputs,
      event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }
      // get date from form data and useParams 
      let [paramsValue1] = Object.values(params)
      // !!! MONGO ID INCLUDE LETTER AND NUMBERS!!!
      let discussionId = String(paramsValue1?.slice(-24));
      const comment = new CommentClass(
         undefined,
         loggedUser.id,
         discussionId,
         (paramsValue1!.includes("club") ? true : false),
         data.content,
      );
      // add comment to the DB
      toggleForm();
      commentApi.create(comment)
         .then(resCommentObj => {
            onUpdateCommentList(resCommentObj);
         })
         .catch(()=>{
            toast("Operation fail 😶",{type:"error"})
         })

   }
   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs" className={styles.mainFormWrapper}
            sx={{
               color: "white",
               pb: "20px",
               height: "fit-content",
               borderRadius: "15px",
               position: "relative",

               // border: "2px solid red",
               // bgcolor:"black",
               // zIndex:"1400",
            }}>
            <CssBaseline />

            <Box
               sx={{
                  height: "440px",
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: "black",
                  borderRadius: "15px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  border: "2px solid gray",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: '#00a082' }}>
                  <DriveFileRenameOutlineIcon style={{ fontSize: "34px" }} />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Add Comment
               </Typography>


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
                     name="content"
                     render={({ field: { onChange, value } }) => (
                        <TextareaAutosize
                           autoFocus
                           aria-label="empty textarea"
                           placeholder="Type your comment..."
                           style={{ height: 200 }}
                           className={styles.textarea}
                           id="content"
                           name="content"
                           value={value}
                           cols={35}
                           maxLength={1000}
                           // rows={10}
                           onChange={onChange}
                        />
                     )}
                  />
                  {
                     errors.content &&
                     <p>{errors.content.message}</p>

                  }

                  <Button type="submit" fullWidth variant="contained"
                     disabled={(isValid && isDirty) === false} sx={{ mt: "20px", mb: "4px" }}>
                     Post
                  </Button>

                  <Button fullWidth variant="outlined"
                     onClick={toggleForm}
                     sx={{ mt: "0px" }}>
                     cancel
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>

   )
}