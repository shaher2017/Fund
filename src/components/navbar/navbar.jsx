import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';


const theme = createTheme();

const Navbar = ({setOnlyuserprojects,onlyuserprojects}) => {
  const selector = useSelector(state=>state.thelist);
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    const handleRegister = ()=>{
        navigate("/register");
    };
    const gohome=()=>{
        navigate("/");
    };

    const logout = ()=>{
      axios.get("http://localhost:4000/users/logout",{headers:{"Content-Type":"application/json"},withCredentials:true})
      .then(()=>{localStorage.clear();navigate("/login")})
      .catch((err)=>{console.log(err)});
    }

  return (
    <ThemeProvider theme={theme}>
      
          <AppBar position="static" style={{backgroundColor:"#ff8800"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:"pointer"
            }}
            onClick={gohome}
          >
            ShaherFund
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
                <MenuItem  onClick={()=>{setOnlyuserprojects(false);
                  navigate("/projects")}}>
                  <Typography textAlign="center">Projects</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography  onClick={()=>{navigate("/funds")}} textAlign="center">Funds</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{setOnlyuserprojects(true);
                  navigate("/projects")}}>
                  <Typography textAlign="center">My Projects</Typography>
                </MenuItem>
                <MenuItem onClick={handleRegister}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} >
                  <Typography  textAlign="center">Login</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            ShaherFund
          </Typography>
          <Box style={{justifyContent:"space-around",marginRight:"7rem"}} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                onClick={()=>{setOnlyuserprojects(false);
                  navigate("/projects")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Projects
              </Button>
              <Button
                onClick={()=>{navigate("/funds")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Funds
              </Button>

              {localStorage.getItem("username") ?  (<Button
                onClick={()=>{navigate("/");setOnlyuserprojects(true);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Projects
              </Button>) : null}
             
              <Button
                onClick={()=>{navigate("/aboutus")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About Us
              </Button>
              
            
          </Box>
          {localStorage.getItem("username") ? (
  <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems:"center" }}>
    <div style={{cursor:"pointer", marginRight:"1rem", color:"red",display:"flex",alignItems:"center"}} >
    <FavoriteIcon   onClick={()=>{navigate("/favorites");}}/>
    <p>{selector.length}</p>
    </div>
    
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        </Box>
        <Avatar alt={localStorage.getItem('username') ? localStorage.getItem('username') : 'Fund'} 
        src="/static/images/avatar/2.jpg" />
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
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography onClick={logout } textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>
  </Box>
) : (
  <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems:"center" }}>
    <Button
      onClick={handleRegister}
      sx={{ my: 2, color: 'white', display: 'block', marginRight: '1rem' }}
    >
      Register
    </Button>
    <Button
      onClick={() => {
        navigate('/login');
      }}
      sx={{ my: 2, color: 'white', display: 'block', marginRight: '2rem' }}
    >
      Login
    </Button>
  </Box>
)}              
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
