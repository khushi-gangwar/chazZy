import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Nav/Navbar';
import "./Editprofile.css";
const Editprofile = () => {
  return (
    <>
    <Navbar/>
   <h1 className='display'>Edit Profile</h1> 
    <form className='edit-Form' >
  
    <label htmlFor="usermane" >Username</label>
    <input type="text"  />
    <label htmlFor="email" >Email</label>
    <input type="text"  />
  
    {/* <label htmlFor="email" >Email address</label>
    <input type="email"  /> */}
    <p style={{fontSize:"0.8rem"}}><i>We'll never share your email with anyone else.</i></p>

  
    <label htmlFor="about">About</label>
    <input type="text" />
  
  
    <label htmlFor="password" >Password</label>
    <input type="password" />
  
    <label htmlFor="gender">Gender</label>
    <input type="text"  />
  <div className="inputF htmlForm-check">
    <input type="checkbox" className="htmlForm-check-input" id="exampleCheck1" />
    <label className="htmlForm-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" classNameNameName="btn btn-primary">Submit</button>
</form>
       <Footer />
  </>
  )
}

export default Editprofile