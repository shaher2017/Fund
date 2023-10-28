import React from 'react';
import thegif from "./404.gif";
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div style={{ display:"flex",justifyContent:"space-around",alignItems:"center"}}>
      <img onClick={()=>{navigate("/");}} style={{cursor:"pointer"}} src={thegif} alt="404 Not Found" />
    </div>
  );
}

export default Notfound;
