import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="main">
      <div className="navbar">
        <div className="icon">
          <h2 className="logo">3D VIRTUAL MUSEUM</h2>
        </div>

        <div className="menu">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">SERVICE</a></li>
            <li><a href="#">DESIGN</a></li>
            <li><a href="#">CONTACT</a></li>
          </ul>
        </div>

        <div className="search">
          <input className="srch" type="search" placeholder="Type To Text" />
          <a href="#"><button className="btn">SEARCH</button></a>
        </div>
      </div>

      <div className="content">
        <h1>3D VIRTUAL <br /><span>MUSEUM</span> <br />WEBSITE</h1>
        <p className="par">
          Explore an immersive experience inside a 3D museum.<br />
          Witness the beauty of virtual art from the comfort of your screen.
        </p>
        <button className="cn">
          <Link to="/museum">Explore Now</Link>
        </button>
      </div>

      <div className="controls-box">
        <h3>Controls</h3>
        <ul>
          <li><strong>W</strong> - Move Forward</li>
          <li><strong>S</strong> - Move Backward</li>
          <li><strong>A</strong> - Move Left</li>
          <li><strong>D</strong> - Move Right</li>
          <li><strong>Mouse</strong> - Look Around</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;