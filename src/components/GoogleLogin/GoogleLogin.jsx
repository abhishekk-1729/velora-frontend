import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state for profile picture

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUser(response); // Ensure the response contains the access token
      if (response && response.access_token) {
        setLoading(true); // Start loading
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
                      })
          .catch((err) => {
          });
      }
    }  });

  return (
    <div>
      <h2>React Google Login</h2>
      {profile ? (
        <div className="text-[#ffffff]">
          {loading ? ( // Show a loading message or spinner while fetching profile
            <p>Loading profile...</p>
          ) : (
            <>
              <p>{profile.picture}</p>
              <img src={profile.picture} alt="user profile" />
              <h3>User Logged In</h3>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <button onClick={logOut}>Log Out</button>
            </>
          )}
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀</button>
      )}
    </div>
  );
}

export default App;
