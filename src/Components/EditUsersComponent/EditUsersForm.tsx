import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { DescriptionType, IdType, RoleEnum, StatusEnum, TimeOfModificationType, UserClass, } from '../../Rest-APi-Client/shared-types';
// react-form-hook (controller)    +  YUP Validation
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import { logged } from '../../App';
import { useContext } from 'react';
import { phoneRegExp } from '../RegisterPage/RegisterForm/RegisterForm';

const theme = createTheme();
const EditUsersComponentMUI = {
   dispay: "flex",
   justifyContent: "center",
   alignItems: "center",

   '& .MuiTextField-root': {
      bgcolor: "rgb(10,25,41)",
      marginBottom: "24px",
      width: "100%",
      zoom: "0.8",
   },
   '& .MuiInputBase-input': {
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

export interface IEditUserData {
   id?: IdType
   fname: string,
   lname: string,
   readonly username: string,
   password: string,
   confirmPassword?: string,
   mail: string,
   phone: string,
   role: RoleEnum,
   userPic: string,
   description?: DescriptionType,
   status: StatusEnum,
   timeOfCreation: string,
   timeOfModification: TimeOfModificationType,
}
const editUserSchema = yup.object({
   fname: yup.string().required("Required field.").min(2, "First name must be at least 2 characters.").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   lname: yup.string().required("Required field.").min(2, "Last name must be at least 2 characters.").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   username: yup.string().required().min(5).max(15).matches(/^[a-zA-Z-0-9]+$/, "Only letters and numbers"),
   mail: yup.string().required().email(),
   phone: yup.string().min(10).required().matches(phoneRegExp, "Please enter a valid phone number"),
   password: yup.string().required().min(5).max(15)
      .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, "At Least one special character.")
      .matches(/^.*[0-9].*$/, "At Least one digit"),
   role: yup.string(),
   userPic: yup.lazy((value: any) =>
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
   description: yup.string().max(512),
}).required();

export default function EditUsersFormComponent() {
   const navigate = useNavigate();
   const user: IEditUserData = useLocation().state;

   const [loggedUser, setLoggedUser] = useContext(logged);

   const { handleSubmit, control, formState: { errors, isValid, isDirty }, } = useForm<IEditUserData>({
      defaultValues: {
         fname: user.fname,
         lname: user.lname,
         username: user.username,
         password: user.password,
         confirmPassword: "",
         mail: user.mail,
         phone: user.phone,
         role: user.role,
         status: user.status,
         userPic: user.userPic,
         description: user.description,
      },
      mode: "onChange",
      resolver: yupResolver(editUserSchema)
   });

   const sendFormData = (data: IEditUserData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }

      const currPicture = data.userPic;
      if (currPicture === "") {
         data.userPic = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISDxAQERAPEBAPEBANEg8PDxAQDw8RFxIWFhURFRMYHSggGBolHRMVITEhJSkrLi4uFx8zODMsNyguLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADoQAAIBAQQEDAQFBQEAAAAAAAABAgMEBRExEiFBUQYTIlJhcYGRobHB0TJCYrIjcpLS8CRzgqLhM//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA11q8YLGUoxX1NIjq9/Uo5aU/yrBd7wAlQV6pwjfy0kvzSb8EjS+ENXm0v0y/cBZwVdcIavNpfpl+43U+EcvmpxfVJr3AsQIijwgpP4lOHS1pLw1+BI2e1Qn8E4y6nrXWtgG4AAAAAAAAAAAAAAAAAAAAAAAAAhr1vpQxhTwlPJyzjH3YEja7bCksZyw3LOT6kQFtv6ctVNcXHfnN+iIqrUcm5Sbk3m3rZ5AzObk8ZNtva22+8wAAAAAAAAng8Vqa2rU0ABJ2O/KkNUvxI/V8X6vcsFhvGnVXJeEtsHqkvfsKYZjJppptNa01qaAvoIC678yhWfQqn7vcn0wAAAAAAAAAAAAAAAAABDX9eWguLg+XJcpr5Y+7A0X3e+dKm+iU19q9yBAAAAAAAAAAAAAAAAAAEtc17Om1Tm8ab1J8z/hEgC+pmSvcH7yyozer5G/s9iwgAAAAAAAAAAAAAHPb7UqVOU3syW+WxFLq1HKTlJ4uTxb6SV4R2vSqKmvhp59Mn7L1IgAAAAAAAGyhQlOWjFNvy6W9gGsE9ZbjitdRuT5sdUe/N+B3QsNJZU4dsU33sCpgtsrHTedOH6UvI4rTckH8DcHu+KPjrAr4N1qss6bwksNzXwvqZpAAAAAACfviXC6LbxtNN/HHky69/aU877ktfF1lj8M+RLtyff5sC3gAAAAAAAAAAa7RVUISm8oxcu5GwiuElbCho8+Sj2LX6AVec225POTcn1vMwAAAAAAAbLPRc5KEc33Le2Wmx2WNOOjHtltk97ODg/Z8Iuo85PRX5Vn4+RLAAAAAAGuvQjOLjJYp966V0lWttldObi9azT3reW0j77s+lScvmp8pdW1evYBWwAAAAAAAXS7LRxlGEtuGD/MtT8jqILgtW5NSG5qa7Vg/LxJ0AAAAAAAAAV7hTPXTjuUpd+C9GWErHCd/jR/tr7pARAAAAAAAYAt1ghhSpr6IvtaxfmbzTYpY0qb+iPkjcAAAAAADEo4pp5NNd55lM9aWrHtApmADe3frAAAAAABK8Gp4V2udCS8U/RlpKhcT/AKmn06S/0kW8AAAAAAAAAVfhMvxo/wBuP3SLQV3hTDlU5b4yj3NP1AgwAAAAGA/bzMmALBcVpxpuO2ns+l6144klGTKpY7S6c1Ja9jW9bi0WecZxUovFP+YMD2pPVjtMab79R60AoeGsDCnqx7DDbPWgZlHEDxjkcd62nQpS3y5C7c/DE7Z4JYt4KKxbeWBWLytfGT1Y6EdUU/PtA5AA0BkAAAAB33Ev6mn/AJfZIt5VeDcMa+PNhJ+S9S1AAAAAAAAACI4S0saKlzJJ9j1eeBLmm10dOnOHOi11PY+8CjgNYPB6mtTW5gAAAAAAHRY7ZKk8YvU84vJmuhQlN4Qi5PoyXW9hJ0rik1yppPYktLvYHdZb2pzzehLdLLslkd0XjrWvq1lYtF11YfLpLfDleGZya09sX2pgXNnHabzpQ+bSfNhrffkisOTe1vxOmhd1WeUGlvlyV4gZt94Sq6nyYrKK829rOQmJXC9HVNaW5pqPf/wjbTZZ03y4tbnnF9oGkAAAAAAAE/wWpf8ApPqgvN+aJ84rns+hQgnm1pvrev2XYdoAAAAAAAAAAAVThBZdCrpL4anK/wAvmXr2kYXO9LHxtNx+ZcqL3SX8w7Smyi02msGng0809wGAAAJW7rocsJVMYxzUcpS69yN1z3blUmumMXs+pkyB5pU1FaMUopbEegAAYABIAADEoppppNPNPWmZAELeFzZypdbh+1+hCtF0Iy9rt005wXLWa569wK8AAB2XTZeMqxj8q5cupbO3Uu04y2XHYuLp4tcueEn0LZH+bwJIAAAAAAAAAAAAAIDhDd2daC/Ol93uT4aAoJIXNYuMnpSXIh/tLYjffF0OD06axg3ris4N+hLWKzqnTjDctb3y2sDeAAAAAAAAAAAAAAACCv2xYPjYrVJ4SW587t/mZEFxrU1KLi8pLBkFd9zynUalioQk1J87DZH3A2XBd2nLjZLkRfJT+aS9EWY804KKSSSSWCSySPQAAAAAAAAAAAAAAAAA1Tp7u42gDlB0SgmaZU2gPIAAAAAAAAAAA9Rg2bYU0gPEKe83IAAAAAAAAAAAAAAAAAAAAAAAAADy4Jnh0uk2gDQ6T6DHFvcdAA5+Le4yqTN4A1Kj0ntQSPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=`;
      }
      const newUser = new UserClass(
         user.id,
         data.fname,
         data.lname,
         data.username,
         data.password,
         data.mail,
         data.phone,
         data.role,
         data.userPic,
         data.description,
      )
      newUser.status = data.status;
      newUser.timeOfModification = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;

      if (loggedUser.id === newUser.id) {
         setLoggedUser(newUser);
      }

      fetch(`http://localhost:8000/api/AllUsers/Edit-form${user.id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newUser)
      })
         .then(() => {
            navigate(-1);
         })
   }

   return (
      <ThemeProvider theme={theme} >
         <Container component="main" maxWidth="xs" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: "center",
                  width: "440px",
                  bgcolor: "black",
                  color: "white",
                  paddingBottom: "80px",
                  border: "2px solid gray",
                  borderRadius: "15px",
                  zIndex: "20",

               }}
            >
               <Avatar sx={{ m: 1, bgcolor: '#ffc244' }}><AppRegistrationIcon style={{ fontSize: "32px" }} /></Avatar>
               <Typography component="h1" variant="h5">  Editing profile ... </Typography>

               {/* FORM ______________________________________________________________ */}
               <Box component="form" noValidate
                  onSubmit={handleSubmit(sendFormData)}
                  sx={{
                     width: "420px",
                     paddingLeft: "26px",
                     paddingRight: "26px",
                     mt: 3,
                     ...EditUsersComponentMUI
                  }}
               >
                  <Grid container spacing={1}>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="fname"
                           label="First name"
                           control={control}
                           maxLength={15}
                           error={errors.fname?.message}

                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="lname"
                           label="Last name"
                           control={control}
                           maxLength={15}
                           error={errors.lname?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="mail"
                           type="mail"
                           label="Email"
                           control={control}
                           maxLength={30}
                           error={errors.mail?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           type="phone"
                           name="phone"
                           label="Phone"
                           control={control}
                           maxLength={10}
                           error={errors.phone?.message}
                        ></ControllerTextFieldInput>
                     </Grid>

                     <Grid item xs={12} sx={{
                        '& .MuiInputBase-input': {
                           backgroundColor: " #202020",
                        }
                     }}>
                        <ControllerTextFieldInput
                           name="username"
                           label="Username"
                           readOnly
                           control={control}
                           error={errors.username?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     {
                        loggedUser.id === user.id
                        && (
                           <Grid item xs={12}>
                              <ControllerTextFieldInput
                                 type='password'
                                 name="password"
                                 label="Password"
                                 control={control}
                                 maxLength={15}
                                 error={errors.password?.message}
                              ></ControllerTextFieldInput>
                           </Grid>

                        )
                     }
                     {
                        (loggedUser.role === 2 && loggedUser.status ===1)
                        &&
                        <>
                           <Grid item xs={12} sm={6}>
                              <FormControl>
                                 <InputLabel>Status</InputLabel>
                                 <Controller
                                    control={control}
                                    name="status"
                                    render={({ field: { onChange, value } }) => (
                                       <Select
                                          value={value}
                                          label="Status"
                                          onChange={onChange}
                                          style={{ width: "180px" }}
                                       >
                                          <MenuItem value={StatusEnum.Active}>Active</MenuItem>
                                          <MenuItem value={StatusEnum.Deactivated}>Deactivated</MenuItem>
                                       </Select>
                                    )}
                                 />
                              </FormControl>
                           </Grid>

                           <Grid item xs={12} sm={6}>
                              <FormControl sx={{ marginBottom: "18px" }}>
                                 <InputLabel >Role</InputLabel>
                                 <Controller
                                    control={control}
                                    name="role"
                                    render={({ field: { onChange, value } }) => (
                                       <Select
                                          value={value}
                                          label="Role"
                                          onChange={onChange}
                                          style={{ width: "180px" }}
                                       >
                                          <MenuItem value={RoleEnum.User}>User</MenuItem>
                                          <MenuItem value={RoleEnum.Admin}>Admin</MenuItem>
                                       </Select>
                                    )}
                                 />
                              </FormControl>
                           </Grid>
                        </>
                     }
                     <Grid item xs={12}>
                        <ControllerTextFieldInput
                           type="search"
                           name="userPic"
                           label="Picture (URL)"
                           control={control}
                           error={errors.userPic?.message}
                           maxLength={10000}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <InputLabel id="description" sx={{ width: "100%", pl: "32px", pr: "32px", }}>Description:</InputLabel>
                     <Grid item xs={12}>
                        <FormControl sx={{ m: 1, minWidth: 60, textAlign: "center" }}>
                           <Controller
                              control={control}
                              name="description"
                              render={({ field: { onChange, value } }) => (
                                 <TextareaAutosize
                                    onChange={onChange}
                                    value={value}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Not necessary only if you are in the mood &#128516;"
                                    style={{ width: 366, height: 150, margin: "auto", backgroundColor: "rgb(32,32,32)", color: "Cornsilk", outline: "none", fontSize: "18px" }}
                                    maxLength={512}
                                 />
                              )}
                           />
                           {/* <p style={{color:"red"}}>{errors.description?.message}</p> */}
                        </FormControl>
                     </Grid>
                  </Grid>


                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                     disabled={(isValid && isDirty) === false}>
                     Save changes
                  </Button>

                  <Button variant="contained" fullWidth sx={{ mt: 0, mb: 2 }}
                     onClick={() => navigate(-1)}>
                     Close
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}