import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import"./register.css";
import axiosinstance from '../axiosconfig';
const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
    const [userData, setUserData] =useState({name:"",email:"",password:"",gender:"male",confirmPassword:""})
    const [userError,setUserError] =useState({name:"",email:"",emailused:"",password:"",confirmPassword:""}) 

    const handlerChange = (e)=>{
      if (e.target.name === "name"){
        if (e.target.value.trim() === "" || e.target.value.trim().length <= 4){
          setUserError({...userError, name: "Name is Required and must be at least 5 characters"});
        }
        else{
          setUserError({...userError, name: ""});
        }
        setUserData({...userData,name: e.target.value});
      }
      if (e.target.name === "email"){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (e.target.value.trim() === "" || !emailRegex.test(e.target.value.trim())){
          setUserError({...userError, email: "Enter Valid Email"});
          axiosinstance.get(`/users/checkemail?email=${e.target.value.trim()}`, {
            headers: { 'content-type': 'application/json' }
          })
          .then(res=>{
            if( res.status === 201){
              setUserError({...userError, emailused: res.data.msg});}
            else{setUserError({...userError, emailused: ""});}})
              .catch(err=>{ console.log(err) });
        }
        else{
          setUserError({...userError, email: ""});
        }
        setUserData({...userData,email: e.target.value.trim()});
      }
      if (e.target.name === "password"){
        if (e.target.value.trim() === "" || e.target.value.trim().length < 8){
          setUserError({...userError, password: "password must be at least 8 characters"});
        }
        else{
          setUserError({...userError, password: ""});
        }
        setUserData({...userData,password: e.target.value});
      }
      if (e.target.name === "confirmPassword"){
        if (e.target.value.trim() !== userData.password){
          setUserError({...userError, confirmPassword: "password does not match"});
        }
        else{
          setUserError({...userError, confirmPassword: ""});
      }
        setUserData({...userData,confirmPassword: e.target.value});
      }
      if (e.target.name === "gender"){
        setUserData({...userData,gender: e.target.value});
      }
      
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    axiosinstance.post("/users/register",userData,{headers:{"Content-Type":"application/json"}})
    .then((response) => {
      if (response.status === 201) {
        navigate("/projects");
      }
      else{
        event.preventDefault();
      }
    }).catch((error) => {console.log(error);})
    console.log(userData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{marginBottom:"2rem"}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="given-name"
                  value={userData.name}
                  onChange={handlerChange}
                />
                <p className='reg-error'>{userError.name}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handlerChange}
                />
                 <p className='reg-error'>{userError.email}</p>
                 <p className='reg-error'>{userError.emailused}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={userData.password}
                  onChange={handlerChange}
                  autoComplete="new-password"
                />
                 <p className='reg-error'>{userError.password}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handlerChange}
                  autoComplete="new-password"
                />
                 <p className='reg-error'>{userError.confirmPassword}</p>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup value={userData.gender || "male"}
                  onChange={handlerChange} name="gender" row>
                    <FormControlLabel
                    defaultChecked
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
