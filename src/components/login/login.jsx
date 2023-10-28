import React, {  useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import myimage from './logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();
const Login = () => {
    const navigate = useNavigate();
    const [userdata, setUserData] = useState({email: '', password:''});
    const [userError, setUserError] = useState({email: '', password:''});

    const handlechange = (e)=>{
        if(e.target.name === "email"){
        setUserData({...userdata,email: e.target.value.trim()});
        }
        if(e.target.name === "password"){
            setUserData({...userdata,password: e.target.value.trim()});
    }
};
        const checkemail =(e)=>{
                axios.get(`http://localhost:4000/users/checkemail?email=${e.target.value.trim()}`, {
                  headers: {'content-type': 'application/json'}
                })
                .then(res=>{
                  if( res.status === 201){
                    setUserError({...userError, email: ""});}
                  else{setUserError({...userError, email: "email is not registered!"});}})
                    .catch(err=>{ console.log(err) });
              setUserData({...userdata,email: e.target.value.trim()});
        }

        const handleSubmit = (e) => {
          e.preventDefault();
          axios
            .post('http://localhost:4000/users/login', userdata, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            })
            .then((response) => {
              if (response.status === 201) {
                localStorage.setItem('username',response.data.name);
                navigate('/projects');
              }
            })
            .catch((err) => {
              console.error(err);
              if (err.response && err.response.status === 403) {
                setUserError({ ...userError, password: err.response.data.msg });
              }
            });
        };
        
      return (
        <ThemeProvider theme={defaultTheme}>
           <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          component="img" 
          src={myimage} 
          alt="background" 
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={userdata.email}
                    onChange={handlechange}
                    onBlur={checkemail}
                    autoFocus
                  />
                  <p className='reg-error'>{userError.email}</p>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={userdata.password}
                    onChange={handlechange}
                    autoComplete="current-password"
                  />
                  <p className='reg-error'>{userError.password}</p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>);}

export default Login;