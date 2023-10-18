import React from 'react';
import '../css/AboutUs.css';

function AboutUs() {
  return (
    <div className="container">
      <div className="header">Our Story</div>
      <p className="story-text">
      [Insert Company Name] was founded by a group of highly skilled and diverse individuals who shared a common passion for programming and technology. The founders, hailing from different parts of the world - Turkey, Chile, and Germany, came together with a shared vision to create innovative solutions in various domains. These include Employee Management, Stock Management, e-commerce website development, chat application development, personal website creation, mobile application development, and appointment system solutions.        {/* ... continue with the rest of your story ... */}
        Thank you for considering [Insert Company Name] as your technology partner. We are excited about the journey ahead and the opportunity to collaborate with you on your projects.
      </p>

      <div className="image-container">
        <div className="image-box">
          <img src="https://i.ibb.co/0mRZZQZ/profile-pic.jpg" alt="First big delivery" />
          <div className="image-caption caption-text">Full Stack Developer - Owner</div>
          <p className="person-info">
            A passionate developer with over a decade of experience in the tech industry. Founded WP Standard after spotting a niche market. Enjoys playing guitar in his free time.
          </p>
        </div>
        <div className="image-box">
          <img src="https://i.ibb.co/rZH01Rd/Screen-Shot-2023-10-18-at-4-10-14-PM.png" alt="Basement Days" />
          <div className="image-caption caption-text">Full Stack Developer - Manager</div>
          <p className="person-info">
            A tech enthusiast with a keen eye for detail. Has been crucial in scaling WP Standard's online presence. Is a coffee aficionado and loves exploring cafes.
          </p>
        </div>
        <div className="image-box">
          <img src="https://i.ibb.co/p4qnzm1/Screen-Shot-2023-10-18-at-4-09-40-PM.png" alt="Mascot" />
          <div className="image-caption caption-text">Agile - Manager</div>
          <p className="person-info">
            An agile expert with a knack for getting teams to work cohesively. Has played a pivotal role in optimizing WP Standard's production cycle. Is an avid reader and traveler.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
