import React from "react";
import "./LandingPage.css";
import Form from "./Form";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="welcomeContainer">
        <h1 className="welcome">Welcome to Jamming</h1>
        <p>
          If you are a registreted user, Let's  
          <Link to="/home">
            <span>get started</span>
          </Link>
        </p>
      </div>

      <div className="textContainer">
        <p>
          Unfortunately, due to Spotify API's guidelines, we can't open the
          application to the public just yet. But if you want to use our clean
          and elegant interface to make your favorites playlists there's good
          news! You can still gain access. All we need is your name and email
          address. Once you provide these details, we'll add you to our user
          list promptly. Rest assured, the process will be quick and seamless.
          As soon as you're added to the list, I'll send you a confirmation
          email so you can start enjoying the app right away.
        </p>
        <Form />
      </div>
    </div>
  );
};

export default LandingPage;
