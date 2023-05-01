import React from 'react';
import {BrowserRouter as Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from './Pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/AuthPage/Login';
import Signup from './Pages/AuthPage/Signup';
import CreatePost from './Pages/CreatePost/CreatePost';
import Editprofile from './Pages/EditProfile/Editprofile';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import UserProfile from './Pages/UserProfile.js/UserProfile';

const router =createBrowserRouter([
  // {path: '/login',element:<Auth />},
  {path: '/home',element:<Home/>},
  {path: '/profile',element:<Profile />},
  {path: '/create',element:<CreatePost />},
  {path:'/settings',element:<Settings/>},
  {path:'/',element:<Login/>},
  {path:'/signup',element:<Signup/>},
  {path:'/add',element:<Add/>},
  {path:'/edit',element:<Editprofile />},
  {path:'/profile/:userid',element:<UserProfile />}

])

function App() {
  return (
<>
<RouterProvider router={router} />
    <ToastContainer theme='dark' autoClose={5000} style={{padding:"0px",margin:"0"}}/>

</>
  ) 
}

export default App;
