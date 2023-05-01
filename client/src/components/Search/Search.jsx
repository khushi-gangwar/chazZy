import React from 'react'
import { useState,useEffect } from 'react';

const Search = () => {

  
  const [query, setquery] = useState("")
  const [serachUser, setserachUser]=useState([])
console.log(query)

  useEffect(()=>{
    fetch("/timeline/user",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer " + localStorage.getItem("jwt")

      }
    }).then((res)=> res.json()).then(data=>{
      setserachUser(data)
    })
  })

  return (
      <div  >
            
          <input
      className="form-control input-search"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={(e)=>setquery(e.target.value)}
    />
              {
                  
                  serachUser.filter(user => {
                      if (query === '') {
                        return null;
                      } else if (user.userName.toLowerCase().includes(query.toLowerCase())) {
                        return user;
                      }
                    }).map((user, index) => (

                     <center><div className='card box' style={{background:"#dddfe2",width:"90%",margin:"2px"}} key={index}>
                          <p style={{margin:"auto",padding:"0.5em"}}>{user.userName}</p>

                      </div></center> 
                    )
                  )

              }

          </div>
  )
};

export default Search