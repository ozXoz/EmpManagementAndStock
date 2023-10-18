import React, { useState } from 'react';
import '../css/Contact.css';

function Contact() {
    const [showForm, setShowForm] = useState(false);

    const handleStartCaseClick = () => {
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send the data via email
        // Remember to replace 'your-email@example.com' with the actual email address
        const formData = new FormData(e.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const question = formData.get('question'); // Retrieve the 'question' field


        // Replace with your own logic to handle form submission
        alert(`Form submitted!\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nQuestion: ${question}`);        
        // Hide the form after submission
        setShowForm(false);
    };

    return (
      <div className="contact-container">
          <h1>Contact Us</h1>
          <div className="contact-section">
              <div className="contact-card">
                  <div className="contact-icon phone-icon"></div>
                  <h2>BY PHONE</h2>
                  <p>(Monday to Friday, 9am to 4pm PST)</p>
                  <p>North America Toll-Free: <span>1-877-930-7483</span></p>
                  <p>International: <span>1-604-637-0780</span></p>
              </div>
              <div className="contact-card">
                  <div className="contact-icon case-icon"></div>
                  <h2>START A NEW CASE</h2>
                  <p>Just send us your questions or concerns by starting a new case and we will give you the help you need.</p>
                  <button onClick={handleStartCaseClick}>START HERE</button>
              </div>
              <div className="contact-card">
                  <div className="contact-icon chat-icon"></div>
                  <h2>LIVE CHAT</h2>
                  <p>Chat with a member of our in-house team.</p>
                  <button>START CHAT</button>
              </div>
          </div>
          {showForm && (
              <form className="contact-form" onSubmit={handleSubmit}>
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" required />
                  <br />
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" required />
                  <br />
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                  <br />
                  <label htmlFor="question">Your Question:</label>
                  <textarea 
                      id="question" 
                      name="question" 
                      rows="4" 
                      maxLength="750" 
                      placeholder="Type your question or thoughts here..." 
                      required 
                  ></textarea>
                  <br />
                  <button type="submit">Submit</button>
              </form>
          )}
      </div>
  );
  
}

export default Contact;
