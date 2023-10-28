import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Projectcard from '../projectcard/projectcard';
import { useSelector } from 'react-redux';

const Favorites = () => {
    const selector = useSelector(state=>state.thelist);
    const [projects, setProjects] = useState([
       
    ]);

    useEffect(()=>{ axios.post("http://localhost:4000/projects/favprojects",selector,
    {headers: {'Content-Type': 'application/json'},
    withCredentials: true}).then((response)=>{setProjects(response.data.projects)}).catch((error)=>{console.log(error);});
},[selector])
    const [projectsid,setProjectsid] = useState([]);

    useEffect(() => {
      if (localStorage.getItem("username")) {
        axios.get("http://localhost:4000/users/userprojects", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
          .then((response) => {
            setProjectsid(response.data.projects);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, []);

  return (
    <div className='projects-container'>
      <div className='projects-grid'>
      {selector.length !==0 ? projects.map((project,index) =><Projectcard key={index} project={project} ids={projectsid}/>): 
      <h2>No Favourite Projects yet</h2>}
      </div>
  </div>
  )
}

export default Favorites;