import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_79v7qpa",
        "template_k2ixboz",
        form.current,
        "ailhJLiaGLGjtodyW"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessage({ text: "Email sent successfully!", type: "success" });
        },
        (error) => {
          console.log(error.text);
          setMessage({
            text: "Failed to send email. Please try again later.",
            type: "error",
          });
        }
      );
  };

  const isFormFilled = name !== "" && email !== "";

  return (
    <div className="emailForm-container">
      <form className="simple-form" ref={form} onSubmit={sendEmail}>
        <div className="input-group">
          <div className="buttonContainer">
            {message && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
          </div>

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

        <div className="input-group">
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
        <div className="buttonContainer">
          <button type="submit" className="button-37" value="Send" disabled={!isFormFilled}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
