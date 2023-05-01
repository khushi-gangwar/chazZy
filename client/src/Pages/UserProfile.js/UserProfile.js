import React, { useEffect, useState } from "react";
import profileImg from "../../assests/girl.jpg";
import Navbar from "../../components/Navbar/Nav/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const UserProfile = () => {
  const [pic, setpic] = useState([]);
  const [user, setuser] = useState([]);
  const [posts, setposts] = useState([]);
  const { userid } = useParams();
const [IsFollow, setIsFollow] = useState(false);
  //TO FOLLOW USER
  const followUser =(userId)=>{
    fetch("/follow",{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body:JSON.stringify({
        followId:userId,
      }),
    }).then((res)=>res.json())
    .then((data)=>{console.log(data)
      setIsFollow(true);

    });

  }
    //TO UNFOLLOW USER
    const unfollowUser =(userId)=>{
      fetch("/unfollow",{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer " +localStorage.getItem("jwt")
        },body:JSON.stringify({
          followId:userId
        })
      }).then((res)=>res.json())
.then((data)=>{
  // console.log(data);
  setIsFollow(false);

      
    })
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setuser(result.user);
        setposts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [IsFollow]);

  return (
    <div>
      <Navbar />

      <div className="main">
        <div className=" row">
          <div className="left col">
            <img src={profileImg} />
          </div>
          <div className="right col">
            <div className="username row">
              <div className="col"style={{margin:"auto",padding:"0"}}>
                <h2 >{user.names}</h2>
              </div>
              <div className="col">   
               <input
                type="submit"
                value=   {IsFollow ? "Unfollow" : "Follow"}
                className="followBtn"
                onClick={()=>{
                if (IsFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
                style={{
                  padding: "0.3rem 3rem",margin:"0",
                }}
              /></div>
            </div>

            <div className="about">
              <p className="h5">#unidentified identinty</p>
            </div>
            <div className="profile-main h4">
              <div className="followers">
              <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
              </div>
              <div className="posts">{posts.length} posts</div>
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
      <hr />

      <div className="gallery">
        <h3 className="posts">My Posts</h3>

        {posts.map((pic) => {
          return <img src={pic.photo} className="mypics "></img>;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
