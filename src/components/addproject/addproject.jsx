import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosinstance from '../axiosconfig';
import "./addproject.css";
const Addproject = () => {
  const navigate = useNavigate();
  const [ project, setProject] = useState({title:'',funds:0,image:'',description:''});
  const [ projecterr, setProjectErr] = useState({title:'',funds:0});
  const defaultTheme = createTheme();
  const handlechange = (e) => {
    if (e.target.name === 'title') {
      const titleValue = e.target.value.trim();
      if (titleValue.length < 4) {
        setProjectErr({ ...projecterr, title: "Must be at least 4 characters" });
      } else {
        setProjectErr({ ...projecterr, title: "" });
      }
      setProject({ ...project, title: e.target.value });
    } else if (e.target.name === 'funds') {
      const input = e.target.value.trim();
      if (input === '') {
        setProjectErr({ ...projecterr, funds: "Required" });
      } else {
        const numericValue = parseFloat(input);
  
        if (isNaN(numericValue) || numericValue <= 0) {
          setProjectErr({ ...projecterr, funds: "Must be a positive number" });
        } else if (numericValue < project.collected) {
          setProjectErr({ ...projecterr, funds: "Can't be less than the collected funds" });
        } else {
          setProjectErr({ ...projecterr, funds: "" });
          setProject({ ...project, funds: numericValue });
        }
      }
      setProject({ ...project, funds: e.target.value });
    } else if (e.target.name === 'image') {
      setProject({ ...project, image: e.target.files[0] });
    } else if (e.target.name === 'description') {
      setProject({ ...project, description: e.target.value });
    }
  };

  const senddata = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("funds", project.funds);
    formData.append("image", project.image);
    formData.append("description", project.description);
  
    axiosinstance
      .post('/projects/addproject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(() => {
        navigate("/projects")
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  return (
    <div className='addproject'>
    <div style={{marginTop:"3rem",borderRadius: "50px"}} className='addproject-content'>
                <h1 >
             <u>ADD NEW PROJECT</u>
          </h1>
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Box component="form" noValidate onSubmit={senddata} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="projectTitle"
                  label="Project Title"
                  autoFocus
                  value={project.title}
                  onChange={handlechange}
                  error={Boolean(projecterr.title)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Fund"
                  label="Required Funds"
                  name="funds"
                  value={project.funds}
                  onChange={handlechange}
                  error={Boolean(projecterr.funds)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 multiline
                  rows={3}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={project.description}
                  onChange={handlechange}
                />
              </Grid>
            </Grid>
            <label className="custom-upload-button">
  <Button
    sx={{ mt: 3 }}
    fullWidth
    component="span"
    variant="contained"
    startIcon={<CloudUploadIcon />}
  >
    Upload Image
  </Button>
  <input
    type="file"
    name="image"
    onChange={handlechange}
    accept="image/*"
    style={{display:"none"}}
  />
      </label>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Project
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    </div>
  )
}

export default Addproject;