import { Link } from '@mui/material'
import React from 'react'

const Suggestion = () => {
  return (
    <div>
         <div className="Suggestion">
              <h5>Suggestions for You</h5>
              <div class="card" style={{ width: "100%", margin: "2rem 0" }}>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Tulika Dutta</li>
                  <li class="list-group-item">Diya Agarwal</li>
                  <li class="list-group-item">Shubham Singh</li>
                </ul>
              </div>
              <ul style={{ display: "flex" }}>
                <li>•About</li>
                <li>•Help</li>
                <li>•Privacy</li>
                <li>•Terms</li>
                <li>•Settings</li>
                <li>•chatzzy</li>
                <li>•for</li>
                <li>•life</li>
              </ul>
              <footer> © 2023 chatzZy.com</footer>
            </div>
    </div>
  )
}

export default Suggestion