import React from 'react';
import "./aboutus.css";
import myimage from "./author.jpg";
import myresume from "./myresume.pdf";
const AboutUs = () => {

  const name = 'Shaher Emad Mohammed';
  const linkedinLink = 'https://linkedin.com/in/shaher-emad-211852223';
  const githubLink = 'https://github.com/shaher2017';
  const cvLink = myresume;
  const phoneNumber = '+20-111-2424-042'; 
  const imageUrl = myimage;

  return (

    <div className="about-us">
      <div className='about-content'>
        <h1>About Us</h1>
      <h2>{name}</h2>
      <h3>Full Stack Developer / ITI Graduate</h3>
      <h3 style={{color:"#ff8800"}}>AWS Certified Cloud Practitioner</h3>
      <h4>Driven and passionate software enthusiast with a strong foundation in engineering as I found that
        is my passion, seeking an exciting and fulfilling role in software development and engineering.
        Eager to apply and expand my current skill set while building a long-term, progressive career
        and gaining valuable experience in the dynamic world of software development.
        </h4>
      <div className="social-links">
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={cvLink} download>
        <button>Download CV</button>
      </a>
      <p style={{display:"inline"}}>Phone: {phoneNumber}</p>
      </div>
      <p style={{display:"inline"}}>Email: shaheremadmohammed@gmail.com</p>

      <h5>Skills</h5>
      <div className='skills'>
      <p><u style={{fontSize:"1.2rem",color:"#ff8800"}}>P. Languages:</u> Python, Java, Javascript, HTML, CSS, SQL, NoSQL.</p>
<p><u style={{fontSize:"1.2rem",color:"#ff8800"}}>Technologies:</u> Django, Flask, Odoo, Springboot, Node.js, Express.js, React, Git,Bootstrap, JQuery, Ajax, Numpy, Pandas, AWS, Docker,
MongoDB, Postgressql</p>
<p><u style={{fontSize:"1.2rem",color:"#ff8800"}}>Tools:</u> GitHub, PyCharm, Intelj IDE,eclipse, Linux Distributions, Shell
Scripting, Agile (Jira & Tello).</p>
</div>
      </div>
      <img src={imageUrl} alt="Your Name" />
    </div>
  );
};

export default AboutUs;
