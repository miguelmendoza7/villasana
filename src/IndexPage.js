import React from "react";
import firebaseconfig from "./firebase-config";

const Home = () => {
    return (
      <>
        <h1>Home</h1>
        <button onClick={() => firebaseconfig.auth().signOut()}>Sign out</button>
      </>
    );
  };

export default Home;