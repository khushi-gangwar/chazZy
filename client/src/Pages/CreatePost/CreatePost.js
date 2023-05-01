import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar/Nav/Navbar";
import "./CreatePost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const CreatePost = () => {
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg)

  const [body, setBody] = useState("");
  const [img, setImg] = useState("");
const [url, seturl] = useState("");
const navigate = useNavigate()

useEffect(()=>{
  fetch("/create",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt")

    },
    body:JSON.stringify({
      body,
      pic:url
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
      notifyA(data.error)
    }
    else{
      notifyB("Successfully Posted")
      navigate("/home")
    }
  })
  .then(data=>console.log(data))
  .catch(err=>console.log(err))
},[url])
  //posting img to cloudinary

  const postDetails=()=>{
    console.log(body,img)
    const data=new FormData()
    data.append("file",img)
    data.append("upload_preset","chatzZy")
    data.append("cloud_name","khushi0425")
    fetch("https://api.cloudinary.com/v1_1/khushi0425/image/upload",
{
  method:"post",
body:data
  }).then (res=>res.json())
  .then(data =>seturl(data.url))
  .catch(err=>console.log(err))

console.log(url)
  //saving posts to mongodb
  
}
 
  return (
    <>
      <Navbar />
      <h1 className="posth">
        <center>Create Post</center>
      </h1>
      <div className="createPost">

        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption..."
          rows="4"
        ></textarea>

      
          <input  type="file"    onChange={(event) => {
            // loadfile(event);
            setImg(event.target.files[0])
          }}/>
        <br />
        <button type="button" onClick={()=>{postDetails()}} class="btn btn-outline-secondary">
          Share
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
