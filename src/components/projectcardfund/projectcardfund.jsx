import React from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {addProject, deleteProject} from "../redux/liked";
import ProgressBar from "@ramonak/react-progress-bar";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Projectcard = (props) => {
  const selector = useSelector(state=>state.thelist);
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const navigate = useNavigate();
  const funding = ()=>{
    if(!localStorage.getItem("username")){navigate("/login");}
    else{
      navigate(`/details/${props.project._id}`);
    }
  }

  const editing =()=>{
    navigate(`/project/${props.project._id}`);
  }
  const deleting = () => {
    axios
      .delete(`http://localhost:4000/projects/deleteproject?id=${props.project._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(deleteProject(props.project._id));
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  let thecolor = selector.includes(props.project._id) ? "red":"gray";
  const favorites = () => {
    if(selector.includes(props.project._id)){
       dispatch(deleteProject(props.project._id));
    }
    else{dispatch(addProject(props.project._id)); }
    
  };
  

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" style={{cursor:"pointer"}}>
            {props.project.ownername[0]}
          </Avatar>
        }
        title={<span style={{fontSize:"25px", fontWeight:"bold"}}>{props.project.title}</span>}
        subheader={formatDate(props.project.createdAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:4000/${props.project.image}`}
        alt=""
      />
<div style={{ display: "flex", width: "100%", justifyContent: "space-around", marginTop:"1rem" }}>
  <p style={{
    width:"40%",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
    color: "black",
    padding: ".2rem",
    backgroundColor: "white",
    borderRadius: ".3rem",
    border:"1px solid",
    height: "auto", 
    textAlign: "center",
    lineHeight: "2rem" ,
  }}>
    Required: {props.project.funds} $
  </p>
  <p style={{
    width:"40%",
    fontWeight: "bold",
    fontSize: "14px",
    margin: 0,
    color: "black",
    padding: ".2rem",
    backgroundColor: "white",
    borderRadius: ".3rem",
    border:"1px solid",
    height: "auto", 
    lineHeight: "2rem",
    textAlign: "center",
  }}>
    Collected: {props.project.collected} $
  </p>
</div>    
<div style={{width:"90%", marginTop:"1rem",marginLeft:"5%"}}>
  <ProgressBar completed={((props.project.collected/props.project.funds)*100).toFixed(0)} maxCompleted={100} />
  <p style={{fontWeight:"bold", textAlign:"center"}}> Funded By : {props.project.amount} $</p>
</div>

      <CardActions disableSpacing >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={()=>{favorites()}} 
          style={{ color: thecolor }}/>
        </IconButton>
         <Button onClick={funding} style={{marginLeft:'2rem', width:"12rem"}} variant="contained" color="success">
          Fund
          </Button>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.project.description}</Typography>
        </CardContent>
        
      </Collapse>
    
    </Card>
    </div>
  )
}

export default Projectcard;