import React from 'react'
import loader from "./loader.gif";
const Loader = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><img src={loader} alt="Loading...." /></div>
  )
}

export default Loader