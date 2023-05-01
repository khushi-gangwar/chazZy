import React, { useState } from "react";
import "./Auth.css";
import loginImg from "../../assests/login.jpg";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
//checking email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }
//sending data to server
    fetch("/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
notifyA("Invalid Credentials")    
    } else {
          notifyB("Signed In successfully");
          // console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/home");
        }
        // console.log(data);
      });
  };

  return (
    <>
      <div className="row">
        <center>
          <h2 className="main-heading card-title">Welcome to the chatzZy.</h2>
          <div className="card-body">
            <p className="card-text" style={{ color: "grey" }}>
              <i> ~Login to see photos post by your friends.</i>
            </p>
          </div>
        </center>

        <div className="col d-none d-lg-block">
          <div
            className="Auth-left card"
            style={{ width: "28rem", borderStyle: "none" }}
          >
            <img src={loginImg} className="card-img-top" alt="..." />
          </div>
        </div>
        <div className="col">
          <div className="Auth-right">
            <div className="container ">
              <label htmlFor="email">
                <b>Email</b>
              </label>

              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p>Email must not be empty</p>

              <label htmlFor="psw">
                {" "}
                <b>Password</b>
              </label>

              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="Xyz@1234"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className="form-control"
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
                }
              />
              <br />

              <input
                type="submit"
                onClick={() => {
                  postData();
                }}
                value="LogIn"
              />
            </div>

            <div
              className="container-bottom"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <p>Don't have an account?</p>
              <a href="/signup">Sign up</a>
              <span className="psw">
                Forgot <a href="/login">password?</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
