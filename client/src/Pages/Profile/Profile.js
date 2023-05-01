import React,{useEffect,useState} from "react";
import profileImg from "../../assests/girl.jpg";
import Navbar from "../../components/Navbar/Nav/Navbar";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Profile.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";


const Profile = () => {
const [pic, setpic] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
  fetch("/myposts",{
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("jwt")}
  }).then(res=>res.json())
  .then((result)=>{
    setpic(result)

    console.log(result)
  })
  .catch((err)=>console.log(err));
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Navbar />

      <div className="main">
        <div className=" row">
        
          <div className="left col">
            <img src={profileImg} />
          </div>
          <div className="right col">
            <div className="username">
              <h3>{JSON.parse(localStorage.getItem("user")).names}</h3>

              <div className="about">
                <p className="h5">#unidentified identinty</p>
              </div>
              <div className="profile-main h4">
              <div className="followers">219 followers</div>
              <div className="posts">3 posts</div>
              <div className="settings h5">
                Go to settings
                <a href="/settings">
                  <SettingsIcon />
                </a>
              </div>
              </div>
             
              <button a href="/" onClick={handleClickOpen} >Change profile</button>
              <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"What do like edit your profile?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Like some changes in your profile for ex. changes in your username,password etc.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <a href="/edit">Yes</a>
        </DialogActions>
      </Dialog>
            </div>
          </div>
          <div className="right">
            <div className="abouth">
              <h3 className="aboutHeading">About</h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              distinctio dolor amet. Ex possimus fuga modi vel ipsa quam ab
              accusantium praesentium voluptas necessitatibus laborum et
              consequatur amet eligendi aperiam perferendis dolore consectetur
              pariatur eius, recusandae reiciendis asperiores nobis! Ullam
              maxime corporis cumque? Sequi provident officiis, hic ipsa
              voluptatem distinctio.
            </div>
          </div>
        </div>
       
      </div>
      <hr/>

      <div className="gallery">
      <h3 className="posts">My Posts</h3>

          {pic.map((pic)=>
         {
          return <img src={pic.photo} className="mypics "></img>
         } )}
        </div>
      <Footer/>
    </div>
  );
};

export default Profile;

