import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import "./editproject.css";
import axiosinstance from '../axiosconfig';
const Editproject = () => {
  const navigate = useNavigate();
    const param = useParams();
    const [project,setProject]= useState({});
    const [projectdata,setProjectdata]= useState({title:"" , funds:"",description:""});
    const [projectdataerr,setProjectdataerr]= useState({title:"" , funds:""});
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  /* eslint-disable react-hooks/exhaustive-deps */
      useEffect(() => {
        const projectid = param.id;
        axiosinstance.get(`/projects/projectdata?projectid=${projectid}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("fund-token")}`,
          },
          withCredentials: true
        })
        .then(response => {
          setProject(response.data.project);
          setProjectdata({...projectdata,title: response.data.project.title,funds: response.data.project.funds
          ,description: response.data.project.description})
        })
        .catch(error => {
          console.log(error);
        });
      }, [param.id]);
      
      const changehandler = (e) => {
        if (e.target.name === 'titleedit') {
          if (e.target.value.trim().length < 4) {
            setProjectdataerr({ ...projectdataerr, title: "Must be at least 4 characters" });
          } else {
            setProjectdataerr({ ...projectdataerr, title: "" });
          }
          setProjectdata({ ...projectdata, title: e.target.value.trim() });
        } else if (e.target.name === 'fundedit') {
          const input = e.target.value.trim();
          if (input === '') {
            setProjectdataerr({ ...projectdataerr, funds: "" });
            setProjectdata({ ...projectdata, funds: "" });
          } else {
            const numericValue = parseFloat(input);
      
            if (isNaN(numericValue)) {
              setProjectdataerr({ ...projectdataerr, funds: "Must be a positive number" });
            } 
            else if (numericValue < project.collected) {
              setProjectdataerr({ ...projectdataerr, funds: "Can not be less than the collected" });
            } else {
              setProjectdataerr({ ...projectdataerr, funds: "" });
              setProjectdata({ ...projectdata, funds: numericValue });
            }
          }
        }
        if (e.target.name === "descedit") {
          setProjectdata({ ...projectdata, description: e.target.value });
        }
      };

      const deleting = () => {
        axiosinstance
          .delete(`/projects/deleteproject?id=${param.id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem("fund-token")}`,
            },
            withCredentials: true,
          })
          .then(() => {
            navigate("/projects")
          })
          .catch(err => {
            console.log(err);
          });
      };
     
      const editing = ()=>{
        if(projectdataerr.name === '' || projectdataerr.funds === ''){
          axiosinstance.patch("/projects/updateproject",{projectdata:projectdata, id : param.id},
          {headers: {'Content-Type': 'application/json'}, withCredentials: true})
          .then(()=>{navigate(`/projects`)})
          .catch((error)=>{console.log(error)});
        }
      };
      
      
    
  return (
    <div className='edit-content'>
      <h1 > Edit Project</h1>
    <div className='old-content'> 
    <Card sx={{ maxWidth: 845, maxHeight:945 }}>
      <CardHeader
        title={project.title}
        subheader={formatDate(project.createdAt)}
      />
      <CardMedia
        component="img"
        height="294"
        width="394"
        image={`${process.env.REACT_APP_BASE_URL}/${project.image}`}
        alt=""
      />
<div style={{ display: "flex", width: "100%", justifyContent: "space-around", marginTop:"1rem", marginBottom:"1rem" }}>
  <p style={{
    width:"40%",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
    color: "white",
    padding: ".2rem",
    backgroundColor: "red",
    borderRadius: ".3rem",
    height: "auto", 
    lineHeight: "2rem" 
  }}>
    Current Required: {project.funds} $
  </p>
  <p style={{
    width:"40%",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
    color: "white",
    padding: ".2rem",
    backgroundColor: "green",
    borderRadius: ".3rem",
    height: "auto", 
    lineHeight: "2rem" 
  }}>
    Current Collected: {project.collected} $
  </p>
</div>

      <div className='edit-zone'>
    <TextField style={{width:"45%"}} id="outlined-basic" label="Title" name='titleedit'
    onChange={changehandler} value={projectdata.title} variant="outlined" />
    <TextField style={{width:"45%"}} id="outlined-basic" label="Funds" name='fundedit'
    onChange={changehandler} value={projectdata.funds} variant="outlined" />
    </div>
    <TextField style={{width:"80%", marginTop:"2rem"}} id="outlined-basic" label="Desc" name='descedit'
    onChange={changehandler} value={projectdata.description} variant="outlined" />
    <div className='edit-zone'>
    <p style={{width:"45%", color:"red"}}>{projectdataerr.title}</p>
      <p style={{width:"45%", color:"red"}}>{projectdataerr.funds}</p>
    </div>
    <div className='btn-zone'>
    <Button style={{marginTop:".5rem", marginBottom:".5rem", width:"38rem"}} 
      onClick={editing} variant="contained" color="success">
          Apply Modifications
          </Button>
          <Button onClick={()=>{deleting()}}   style={{ marginBottom:"1rem", width:"38rem"}} variant="contained" color="error">
          Delete
          </Button>
          <Button style={{ marginBottom:"1rem", width:"38rem"}} variant="contained" color="warning"
          onClick={()=>{navigate("/projects")}}>
          Cancel
          </Button>
          </div>
          
    </Card>
    </div>
    <CardActions disableSpacing>   
      </CardActions>
    </div>
  )
}

export default Editproject