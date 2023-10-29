import React, { useState, useEffect} from 'react';
import Projectcard from '../projectcard/projectcard';
import "./projects.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import axiosinstance from '../axiosconfig';
const Projects = ({onlyuserprojects}) => {

  const selector = useSelector(state=>state.thelist);
  const [projectsid,setProjectsid] = useState([]);

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxpages, setMaxPages] = useState();

  const fetchProjects = async (page) => {
    if(!onlyuserprojects)
   { try {
      const response = await axiosinstance.get(`/projects/allprojects?page=${page}`);
      setProjects(response.data.projects);
      setMaxPages(response.data.pagesno);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
    if (localStorage.getItem("username")) {
      axiosinstance.get("/users/userprojects", {
        headers: { "Content-Type": "application/json",'Authorization': `${localStorage.getItem("fund-token")}` },
        withCredentials: true
      })
        .then((response) => {
          setProjectsid(response.data.projects);
        })
        .catch((error) => {
          console.log(error);
        });
    }}
    else{
      if (localStorage.getItem("username")) {
        axiosinstance.get("/users/userprojects", {
          headers: { "Content-Type": "application/json",'Authorization': `${localStorage.getItem("fund-token")}` },
          withCredentials: true
        })
          .then((response) => {
            setProjectsid(response.data.projects);
            setProjects(response.data.projectsdata);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage,selector,onlyuserprojects]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className='projects-container'>
      {localStorage.getItem("username") ? <Button onClick={()=>{navigate("/addproject")}} 
      style={{backgroundColor:'blue', width:"60%", fontSize:"1.5rem", marginBottom:"2rem"}}
       variant="contained" color="success">
          Add Project
          </Button> : null}
         
        <div className='projects-grid'>
      {projects.map((project,index) =><Projectcard key={index} project={project} ids={projectsid}/>)}
        </div>

      <Pagination
      style={{marginBottom: "2rem", marginTop: "2rem"}}
        count={maxpages} 
        page={currentPage}  
        variant="outlined"
        color="primary"
        onChange={handleChange} 
      />
    </div>
  );
};

export default Projects;
