import React from 'react';
import HomeImage from '../assets/images/home3.png'; // Import the image
import './css/Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <img
        src={HomeImage}
        alt="Home"
        className="home-image"
      />
    </div>
  );
};

export default Home;