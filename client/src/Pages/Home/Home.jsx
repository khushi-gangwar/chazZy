import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Nav/Navbar";
import "./Home.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import Suggestion from "../../components/suggestion/suggestion"

const Home = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setdata(result))
      .catch((err) => console.log(err));
  }, []);


  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        // console.log(result);
      });
  };


  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col">
          {data.map((posts) => {
            return (
              <div className="card" style={{ margin: "2rem auto" }}>
                <div className="profile card-title">
                  <div className="profile pic-header">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />

                    <Link to={`/profile/${posts.postedBy._id}`}>
                      {" "}
                      <h5>{posts.postedBy.names}</h5>
                    </Link>
                  </div>
                </div>
                <div className="profile main-pic">
                  <img
                    src={posts.photo}
                    class="card-img-top"
                    alt="..."
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="profile card-body">
                  <div className="icon">
                    {posts.likes.includes(
                      JSON.parse(localStorage.getItem("user"))._id
                    ) ? (
                      <FavoriteIcon
                        className="fav-outline"
                        color="error"
                        onClick={() => {
                          unlikePost(posts._id);
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="fav-filled"
                        onClick={() => {
                          likePost(posts._id);
                        }}
                      />
                    )}
                  </div>
                  <div className="icon">
                    <AddCommentOutlinedIcon />
                  </div>
                  <div className="icon">
                    <SendIcon />
                  </div>
                  <br />
                </div>{" "}
                <p>{posts.likes.length} likes</p>
                <p>{posts.body}</p>
                <div className="comment">
                  <input
                    type="text"
                    placeholder="Add comment"
                    label="Add Comment"
                    style={{ border: "none", borderBottom: "2px grey solid" }}
                  ></input>

                  <input
                    type="submit"
                    style={{
                      border: "none",
                      backgroundColor: "rgb(0 0 0 / 0%)",
                      color: "rgba(0, 0, 0, 0.2 )",
                      padding: "0",
                    }}
                    value="Post"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-lg-2 d-none d-md-block" style={{ padding: "3rem" }}>
          <div class="position-absolute sticky end-0 mymedia">
{/* search */}
<Search/>
            <div className="main-profile" style={{ padding:"0.5rem"}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div className="name" style={{ lineHeight: "0.5rem" }}>
                <p className="profile-icons username">
                  {JSON.parse(localStorage.getItem("user")).userName}
                </p>
                <p className="profile-icons user">
                  {JSON.parse(localStorage.getItem("user")).names}
                </p>
              </div>
            </div>
 {/* SUGGESTION-BOX */}
<Suggestion/>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
