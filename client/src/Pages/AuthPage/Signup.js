import  React,{useState} from 'react'
import "./Auth.css";
import loginImg from "../../assests/login.jpg";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

const Signup = () => {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  const navigate = useNavigate()

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/


const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);


const [names,setName] =useState('');
const[userName,setUserName]=useState('');
const [email,setEmail]=useState('');
const [password,setpassword]=useState('');


const postData=()=>{
if(!emailRegex.test(email)){
  notifyA("Invalid Email")
  return
}
else if (!passRegex.test(password)) {
  notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
  return
}


fetch("/signup", {
  method: "post",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    names: names,
    userName: userName,
    email: email,
    password: password

  })
})


.then(res => res.json())
  .then(data => {
    if (data.error) {
      notifyA(data.error)
    } 
    else {
      notifyB("Registered Successfully")
      navigate("/")
    }
    // console.log(data)
  })
}


  return (
    <>
          <div className="row">
      <center>
        
        <h2 className="main-heading card-title">Welcome to the chatzZy.</h2>
        <div className="card-body">
            <div className="card-text" style={{color: 'grey'}}>
            
               <p><i> ~Signup to see photos post by your friends</i></p>
              
              
            </div>
          </div>
      </center>
      
    <div className="col d-none d-lg-block">
        <div className="Auth-left card"style={{ width: "28rem", borderStyle: "none" }}>
          <img src={loginImg} className="card-img-top" alt="..." />
      
    </div></div>
    <div className="col">
    <div className="Auth-right">
          
            <div className="container">
              
                <label htmlFor="uname">
                  <b>Username</b>                </label>

                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    required
                  />
              
              <br />
              <label htmlFor="name">
                  <b>Name</b>                </label>

                  <input
                    type="text"
                    placeholder="Enter FullName"
                    name="names"
                    value={names}
                    onChange={(e)=>{setName(e.target.value)}} 
                    required
                  />
              <label htmlFor="email">
                <b>Email</b>{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
              />
              <label htmlFor="psw"><b>Password</b></label><br/>

          <Input 
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'} className='form-control'
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}

            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }/>
            <br/>
              <input type="submit" onClick={()=>{postData()}} value="Sign Up"/>
            
            </div>

            <div className="container-bottom" style={{ backgroundColor: "#f1f1f1" }} >
            <p>Have an account?</p>
          <Link to='/'>Login</Link> 
              <span className="psw">
                Forgot <Link to="#">password?</Link>
              </span>
            </div>
          
        </div>
      </div>
    </div>
  
    </>
  )
}

export default Signup