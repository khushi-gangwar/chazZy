import React from "react";
import "./Navbar.css";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Navbar = () => {

  const Navigate=useNavigate()

  const logout=()=>{
    localStorage.clear()
    Navigate("/")
  }

  return (
    <div>
      <ul id="nav" style={{ textDecoration: "none"}}>
        <li className=" logo">ChatzZy</li>
        
        <li><Link to="/home" className="nav-item"> <HomeIcon /> </Link></li>
       
        <li> <Link to="/create" className="nav-item"><PostAddIcon /> </Link></li>
        
       
        <li><Link to="/Profile" className="nav-item"><InfoIcon /></Link></li>
        
     <li className=" d-none d-md-block"><button type="button" class="btn btn-outline-danger" onClick={logout}>logout</button>
</li>

      </ul>
    </div>
  );
};

export default Navbar;
