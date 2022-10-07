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
import { Link, NavLink } from "react-router-dom";

const pages = ['Question Room', 'Reading Clubs', 'Exchange Page', 'About Us'];
const settings = ['MyProfile', 'Logout'];

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

   const toggleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      if (anchorElNav !== null) {
         setAnchorElNav(null);
      }
      else {
         setAnchorElNav(event.currentTarget);
      }
   }
   const toggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      if (anchorElUser !== null) {
         setAnchorElUser(null);
      }
      else {
         setAnchorElUser(event.currentTarget);
      }
   }


   return (
      <AppBar position="fixed" sx={{
         zIndex: "2000",
         top: "0",
      }}>
         <Container maxWidth={false} sx={{ backgroundColor: "#f7ba00", marginBottom: "0px", padding: "0px", width: "100%" }}>
            <Toolbar disableGutters>

               <Link to="/">
                  <Typography
                     variant="h6"
                     noWrap
                     component="h1"
                     sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'gray',
                        textDecoration: 'none',
                     }}
                  >
                     <img src={require("./GBlogo2.png")} alt="logo" style={{ width: "200px", }} />
                  </Typography>
               </Link>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, zIndex: "2000" }}>
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
                     {/* !!! MOBILE menu _____________________________*/}
                     {pages.map((page) => (
                        <Link to={page.replace(" ", "")} key={page}>
                           <MenuItem onClick={handleCloseNavMenu}>
                              <Typography textAlign="center">
                                 {page}
                              </Typography>
                           </MenuItem>
                        </Link>
                     ))}
                  </Menu>
               </Box>

               <Typography
                  variant="h5"
                  noWrap
                  component="h1"
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
                  <Link to={"/"}>
                     <img src={require("./GBlogo.PNG")} alt="logo" style={{ width: "140px" }} />
                  </Link>
               </Typography>



               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {/* BIG SCREEN NAV __________________________ */}
                  {
                     pages.map((page) => (
                        <NavLink to={page.replace(" ", "")} key={page}
                           className={({ isActive }) =>
                              isActive ? styles.activeNav : undefined
                           }>
                           <Button
                              onClick={handleCloseNavMenu}
                              sx={{ my: 2, color: 'rgb(48,48,48)', display: 'block', mr: "50px", fontWeight: "700", marginLeft: "auto", marginRight: "auto" }}
                           >
                              {page}
                           </Button>
                        </NavLink>
                     ))
                  }

               </Box>
               {/* USER MENU ____________________________________*/}
               {/* HERE CHECK LOGGED OR NOT for hader buttons */}
               {
                  // if not logged
                  <>
                     <Link to="/Login"><Button variant="text" >Login</Button></Link>
                     <Link to="/Register"> <Button variant="text">Register</Button> </Link>
                     <Link to="/AllUsers"><Button variant="contained">ALL USERS</Button>   </Link>

                  </>
               }
               {
                  // lock pages for guest
                  // <div className={styles.lockCoverDiv}>

                  // </div>
               }
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={toggleUserMenu} sx={{ p: 0, m: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     // fix bc of zoom ot entire APP - ml:"20%" 
                     sx={{ mt: '40px', }}
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
                        <Link to={setting} key={setting}>
                           <MenuItem onClick={handleCloseUserMenu}>
                              <Typography textAlign="center">{setting}</Typography>
                           </MenuItem>
                        </Link>

                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default Header;

