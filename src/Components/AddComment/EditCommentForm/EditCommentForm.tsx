import styles from './EditCommentForm.module.css';
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
import { CLIENT_RENEG_LIMIT } from 'tls';


const schema = yup.object({
   content: yup.string().required().min(1).max(1000),
}).required();


const theme = createTheme();
const formsMUIoverride = {
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

interface IEditCommentFormInputs {
   content: string,
}
interface IEditCommentFormProps {
   toggleForm(): void,
   editComment: CommentClass;
   onUpdateCommentList: (comment: ICommentProps) => void,
}

export default function EditCommentForm({ toggleForm, editComment, onUpdateCommentList }: IEditCommentFormProps) {
   const { handleSubmit, control, formState: { errors, isValid, isDirty } } = useForm<IEditCommentFormInputs>({
      defaultValues: { content: editComment.content },
      mode: "onChange",
      resolver: yupResolver(schema)

   });


   const sendSubmit = (data: IEditCommentFormInputs,
      event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }

      const updatedComment = { 
          ...editComment,
          content: data.content,
          timeOfModification :`${new Date().toDateString()} ${new Date().toLocaleTimeString()} `
         };

      // add comment to the DB
      toggleForm();
      commentApi.update(updatedComment)
         .then(resCommentObj => {
            console.log("response res");
            console.log(resCommentObj);
            onUpdateCommentList(resCommentObj)
            // onCreateComment(resCommentObj);
         });

   }

   const deleteComment = () => {
      commentApi.deleteById(editComment.id)
         .then(res => {
            onUpdateCommentList({...editComment,content:`_this_entity_was_deleted`});
            console.log({...editComment,content:undefined});
         })

   };

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
                  height: "520px",
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
                     Save
                  </Button>

                  <Button fullWidth variant="outlined"
                     onClick={toggleForm}
                     sx={{ mt: "0px" }}>
                     cancel
                  </Button>
                  <Button fullWidth variant="contained" color="error"
                     onClick={deleteComment}
                     sx={{ mt: "30px" }}>
                     Delete comment
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>

   )
}