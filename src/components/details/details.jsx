import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Amount} from "../paycontext/paycontext";
import ProgressBar from "@ramonak/react-progress-bar";
import axiosinstance from '../axiosconfig';
const Details = () => {
  const { setAmountcon, setProjectid } = useContext(Amount);
    const [project,setProject] = useState({title:"",image:"",description:"",funds:"",collected:""});
    const [amount,setAmount] = useState(0);
    const [amounterr,setAmounterr] = useState("");
    const navigate = useNavigate();
    const param = useParams();

    const paying = ()=>{
      setProjectid(param.id);
      navigate("/paying");
    }

    const changeamount = (e)=>{
      if (isNaN(e.target.value)) {
        setAmounterr("Please enter a valid number.");
      }
        else if(e.target.value < 0 || Number(e.target.value) + Number(project.collected) > Number(project.funds)){
          setAmounterr("Amount can not be less than 0 or greater than Total required funds");
        }
        else{
          setAmounterr("");
        }
      setAmount(e.target.value);
      setAmountcon(e.target.value);
    }


    useEffect(() => {
      axiosinstance.get(`/projects/projectdata?projectid=${param.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("fund-token")}`,
          },
          withCredentials: true
        })
        .then((response)=>{setProject(response.data.project);})
        .catch((error)=>{console.error(error);});
      }, [param.id]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  return (
    <div className='edit-content'>
    <h1 style={{marginLeft:"2rem"}}> Project Details</h1>
  <div style={{display:"flex", justifyContent:"space-around"}}> 
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
<div style={{ textAlign:"center", display: "flex", width: "100%", justifyContent: "space-around",
 marginTop:"1rem", marginBottom:"2rem" }}>
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
<div style={{width:"90%", marginTop:"1rem",marginLeft:"5%", marginBottom:"2rem"}}>
  <ProgressBar completed={((project.collected/project.funds)*100).toFixed(0)} maxCompleted={100} />
</div>
<TextField
  style={{ width: "90%", marginLeft: "5%", marginBottom: "1rem" }}
  id="outlined-basic"
  label="Amount in USD"
  name='amountvalue'
  onChange={changeamount}
  value={amount}
  variant="outlined"
/>
<p style={{ width: "90%", color: "red", marginLeft: "5%", marginBottom: "1rem"  }}>{amounterr}</p>
{
  amounterr !== "" ? (
    <button disabled>Pay with PayPal</button>
  ) : (
    <Button style={{marginTop:".5rem", marginBottom:".5rem", width:"38rem"}} 
     onClick={paying} variant="contained" color="success">
        Pay The Amount
        </Button>
  )
}
  <div className='btn-zone'>
        <Button style={{ marginBottom:"1rem", width:"38rem"}} variant="contained" color="warning"
        onClick={()=>{navigate("/projects")}}>
        Back To Home
        </Button>
        </div>
        
  </Card>
  </div>
  <CardActions disableSpacing>   
    </CardActions>
  </div>
  )
}

export default Details;