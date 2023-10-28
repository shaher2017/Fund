import React, { useState, useEffect} from 'react';
import Projectcard from '../projectcardfund/projectcardfund';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../axiosconfig';
const Funds = () => {
  
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxpages, setMaxPages] = useState();
  
    useEffect(()=>{
      axiosinstance.get(`/projects/getuserfunds?page=${currentPage}`,{
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }).then(response=>{setProjects(response.data.projects);setMaxPages(response.data.pagesno);
             console.log(response.data.pagesno)})
          .catch(err=>{console.log(err);});
    },[currentPage])
  
    const handleChange = (event, value) => {
      setCurrentPage(value);
    };
  
    return (
      <div className='projects-container'>
           {projects.length !== 0 ?<div className='projects-grid'>
        {projects.map((project,index) =><Projectcard key={index} project={project} ids={null}/>)}
          </div> : <p style={{color:"red",fontSize:"2rem",fontWeight:"bold"}}>You have not funded any projects Yet!</p>}
          
  
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

export default Funds