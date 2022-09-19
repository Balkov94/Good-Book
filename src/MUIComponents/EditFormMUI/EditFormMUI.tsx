import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { GenderEnum, RoleEnum, StatusEnum, } from '../../Rest-APi-Client/shared-types';
import { IFormData } from '../RegisterFormMUI/RegisterFormMUI';
// react-form-hook (controller)    +  YUP Validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ControllerTextFieldInput from '../ControllerTextFieldInput/ControllerTextFieldInput';
import styles from "./overrideMUIStyles.module.css"; //some little override -> main BOX container
import { formsMUIoverride } from '../../Components/LoginPage/LoginForm/LoginForm';

const theme = createTheme();
const URL = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const schema = yup.object({
   fname: yup.string().required("Required field.").min(2, "First name must be at least 2 characters.").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   lname: yup.string().required("Required field.").min(2, "Last name must be at least 2 characters.").max(15).matches(/^[a-zA-Z]+$/, "Only letters (EN)."),
   username: yup.string().required().min(5).max(15).matches(/^[a-zA-Z-0-9]+$/, "Only letters and numbers."),
   password: yup.string().required().min(8).max(15)
      .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, "At Least one special character.")
      .matches(/^.*[0-9].*$/, "At Least one digit."),
   gender: yup.string(),
   role: yup.string(),
   // picture: yup.string().matches(URL,"Valid image address (URL)"),
   picture: yup.lazy((value: any) =>
      /^data/.test(value)
         ? yup.string()
            .trim()
            .matches(
               /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
               'Must be a valid data URI',
            )
            .required()
         : yup.string().trim().url('Must be a valid URL').required("Picture url is required!"),
   ),
   description: yup.string().max(512),
}).required();

interface IEditFormProps {
   handleFormData(formData?: Partial<IFormData>): void;
   isAdminEdition?: boolean;
   handleEditMode?: (event?: any) => void;
   editUser?: IFormData;
}

export default function EditFormMUI({ editUser, handleFormData, handleEditMode, isAdminEdition }: IEditFormProps) {
   const { handleSubmit, control, formState: { errors, isValid , isDirty } } = useForm<IFormData>({
      defaultValues: {
         fname: editUser?.fname,
         lname: editUser?.lname,
         username: editUser?.username,
         password: editUser?.password,
         gender: editUser?.gender,
         role: editUser?.role,
         status: editUser!.status,
         picture: editUser?.picture,
         description: editUser?.description,
      },
      mode: "onChange",
      resolver: yupResolver(schema)

   });
  
   const sendFormData = (data: IFormData, event: React.BaseSyntheticEvent<object, any, any> | undefined) => {
      if (event !== undefined) {
         event.preventDefault();
      }
      let updatedUser = {
         ...editUser,
         ...data,
         timeOfModification: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
      }
      handleFormData(updatedUser);
   }

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={styles.editForm}> {/*box override styles with css module*/}
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Edit user - {editUser?.username}
               </Typography>

               {/* FORM ______________________________________________________________ */}
               {/* <Box component="form" noValidate onSubmit={handleSubmit(sendFormData)} */}
               <Box component="form" noValidate onSubmit={handleSubmit(sendFormData)}
                  sx={{ mt: 3, ...formsMUIoverride }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="fname"
                           label="First name"
                           control={control}
                           error={errors.fname?.message}
                        ></ControllerTextFieldInput>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="lname"
                           label="Last name"
                           control={control}
                           error={errors.lname?.message}
                        ></ControllerTextFieldInput>
                     </Grid>

                     <Grid item xs={12} sm={6}>
                        <ControllerTextFieldInput
                           name="username"
                           label="Username"
                           control={control}
                           readOnly={true}
                           error={errors.username?.message}
                        ></ControllerTextFieldInput>
                     </Grid>

                     <Grid item xs={12} sm={6}>
                        <FormControl>
                           <InputLabel >Gender</InputLabel>
                           <Controller
                              control={control}
                              name="gender"
                              render={({ field: { onChange, value } }) => (
                                 <Select
                                    fullWidth
                                    id="demo-simple-select"
                                    value={value}
                                    label="Gender"
                                    onChange={onChange}
                                    style={{ height: "58px", paddingTop: "20px" }}
                                    MenuProps={{
                                       sx: {
                                          fontSize: "16px",
                                          "&& .Mui-selected": {
                                             backgroundColor: "gray"
                                          },
                                       }
                                    }}
                                 >
                                    <MenuItem value={GenderEnum.Male}>Male</MenuItem>
                                    <MenuItem value={GenderEnum.Female}>Female</MenuItem>
                                 </Select>
                              )}
                           />
                        </FormControl>
                     </Grid>
                     {
                        // SELF EDITION CHECKS (show or not ROLE and STATUS)
                        isAdminEdition === undefined ?
                           <><Grid item xs={12}>
                              <ControllerTextFieldInput
                                 name="password"
                                 label="Password"
                                 control={control}
                                 error={errors.password?.message}
                              // defaultValue={editUser?.password}
                              ></ControllerTextFieldInput>
                           </Grid>
                              {
                                 (RoleEnum[editUser!.role] === "Admin")
                                 &&
                                 <><Grid item xs={12} sm={6}>
                                    <FormControl>
                                       <InputLabel>Role</InputLabel>
                                       <Controller
                                          control={control}
                                          name="role"
                                          render={({ field: { onChange, value } }) => (
                                             <Select
                                                fullWidth
                                                id="demo-simple-select"
                                                value={value}
                                                label="Role"
                                                onChange={onChange}
                                                style={{ height: "58px", paddingTop: "20px" }}
                                                MenuProps={{
                                                   sx: {
                                                      fontSize: "16px",
                                                      "&& .Mui-selected": {
                                                         backgroundColor: "gray"
                                                      },
                                                   }
                                                }}
                                             >
                                                <MenuItem value={RoleEnum.User}>User</MenuItem>
                                                <MenuItem value={RoleEnum.Admin}>Admin</MenuItem>
                                             </Select>
                                          )}
                                       />
                                    </FormControl>
                                 </Grid>
                                    <Grid item xs={12} sm={6}>
                                       <FormControl>
                                          <InputLabel>Status</InputLabel>
                                          <Controller
                                             control={control}
                                             name="status"
                                             render={({ field: { onChange, value } }) => (
                                                <Select
                                                   fullWidth
                                                   id="demo-simple-select"
                                                   value={value}
                                                   label="Status"
                                                   onChange={onChange}
                                                   style={{ height: "58px", paddingTop: "20px" }}
                                                   MenuProps={{
                                                      sx: {
                                                         fontSize: "16px",
                                                         "&& .Mui-selected": {
                                                            backgroundColor: "gray"
                                                         },
                                                      }
                                                   }}
                                                >
                                                   <MenuItem value={StatusEnum.Active}>Active</MenuItem>
                                                   <MenuItem value={StatusEnum.Deactivated}>Deactivated</MenuItem>
                                                   <MenuItem value={StatusEnum.Suspended}>Syspended</MenuItem>
                                                </Select>
                                             )}
                                          />
                                       </FormControl>
                                    </Grid></>
                              }
                           </>
                           // If Admins is editing someone else
                           :
                           <><Grid item xs={12} sm={6}>
                              <FormControl>
                                 <InputLabel>Role</InputLabel>
                                 <Controller
                                    control={control}
                                    name="role"
                                    render={({ field: { onChange, value } }) => (
                                       <Select
                                          fullWidth
                                          value={value}
                                          label="Role"
                                          onChange={onChange}
                                          style={{ height: "58px", paddingTop: "20px" }}
                                          MenuProps={{
                                             sx: {
                                                fontSize: "16px",
                                                "&& .Mui-selected": {
                                                   backgroundColor: "gray"
                                                },
                                             }
                                          }}
                                       >
                                          <MenuItem value={RoleEnum.User}>User</MenuItem>
                                          <MenuItem value={RoleEnum.Admin}>Admin</MenuItem>
                                       </Select>
                                    )}
                                 />
                              </FormControl>
                           </Grid>
                              <Grid item xs={12} sm={6}>
                                 <FormControl>
                                    <InputLabel>Status</InputLabel>
                                    <Controller
                                       control={control}
                                       name="status"
                                       render={({ field: { onChange, value } }) => (
                                          <Select
                                             fullWidth
                                             value={value}
                                             label="Status"
                                             onChange={onChange}
                                             style={{ height: "58px", paddingTop: "20px" }}
                                             MenuProps={{
                                                sx: {
                                                   fontSize: "16px",
                                                   "&& .Mui-selected": {
                                                      backgroundColor: "gray"
                                                   },
                                                }
                                             }}
                                          >
                                             <MenuItem value={StatusEnum.Active}>Active</MenuItem>
                                             <MenuItem value={StatusEnum.Deactivated}>Deactivated</MenuItem>
                                             <MenuItem value={StatusEnum.Suspended}>Suspended</MenuItem>
                                          </Select>
                                       )}
                                    />
                                 </FormControl>
                              </Grid></>

                     }
                     <Grid item xs={12}>
                        <ControllerTextFieldInput
                           name="picture"
                           label="Picture (URL)"
                           control={control}
                           error={errors.picture?.message}
                           maxLength={10000}                         
                        ></ControllerTextFieldInput>
                     </Grid>

                     <InputLabel id="description" sx={{ width: "100%", pl: "32px" }}>Description:</InputLabel>
                     <Grid item xs={12}>
                        <FormControl sx={{ m: 1, minWidth: 60, margin: "auto" }}>
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
                                    maxLength={512}
                                 />
                              )}
                           />
                        </FormControl>
                     </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={(isValid && isDirty)===false} >
                        save changes
                  </Button>
                  <Button type="submit" fullWidth variant="outlined"
                     onClick={handleEditMode}
                     sx={{ mt: 1, mb: 6 }} >
                     back
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}