// import styles from "./Header.module.css";

// function Header() { 
//      return (
//           <header className={styles.header}>
//                <h1>TypeScript + React <span style={{fontSize:"20px"}}>+ React-form-hook + YUP + MUI components </span> = Users administration project
//                <img src={require('./usersIcon.jpg')}  alt="users-icon" />
//                </h1>
//           </header>
//      );
// }

// export default Header;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import styles from './Header.module.css';

const pages = ['?Question room?', 'X-changer','Book Clubs','About us'];
const settings = ['Profile', 'Logout'];

const Header = () => {
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const toggleNavMenu=(event: React.MouseEvent<HTMLElement>)=>{
         if(anchorElNav!==null){
            setAnchorElNav(null);
         }
         else{
            setAnchorElNav(event.currentTarget);
         }
   }
   const toggleUserMenu=(event: React.MouseEvent<HTMLElement>)=>{
      if(anchorElUser!==null){
         setAnchorElUser(null);
      }
      else{
         setAnchorElUser(event.currentTarget);
      }
}


   return (
      <AppBar position="sticky" sx={{zIndex:"2000"}}>
         <Container maxWidth={false} sx={{ backgroundColor: "#f7ba00", marginBottom:"0px",padding:"0px", width:"100%"}}>
            <Toolbar disableGutters>
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  <img src={require("./GBlogo.PNG")} alt="logo"  style={{width:"140px"}}/>
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     // onClick={handleOpenNavMenu}
                     onClick={toggleNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  {/* PAGES */}
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>

               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                 <img src={require("./GBlogo.PNG")} alt="logo"  style={{width:"140px"}}/>

                  {/* NAV MENU___________________________________ */}
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {/* Filter here if user is nto logged */}
                  {pages.map((page) => (
                     <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',mr:"50px" }}
                     >
                        {page}
                     </Button>
                  ))}
               </Box>
               {/* USER MENU ____________________________________*/}
               {/* HERE CHECK LOGGED OR NOT for hader buttons */}
               {
                  // if not logged
                  <>
                   <Button variant="text">Login</Button>
                   <Button variant="text">Register</Button>   
                   <Button variant="contained">ALL USERS</Button>   
                  </>          
               }
               {
                  // lock pages for guest
                  // <div className={styles.lockCoverDiv}>

                  // </div>
               }
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={toggleUserMenu} sx={{ p: 0 , m:0}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Header;

