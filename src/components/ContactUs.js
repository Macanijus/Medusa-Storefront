import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhoneNumber(input);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCommentChange = (e) => {
    const input = e.target.value.slice(0, 140); // Limit comment to 140 characters
    setComment(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && phoneNumber && email && comment) {
      // Simulating sending the message
      setTimeout(() => {
        setIsMessageSent(true);
      }, 1000);

      // Reset form fields
      setName("");
      setPhoneNumber("");
      setEmail("");
      setComment("");
      setError("");
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Please feel free to contact us or write a comment</h2>
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            pattern="[0-9]*"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            maxLength={140}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Send</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {isMessageSent && (
          <div className="success-message">Your message has been sent.</div>
        )}
      </form>
    </div>
  );
}

export default ContactUs;
