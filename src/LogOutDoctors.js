import { AuthContext } from "./Auth.js";
import {  useContext, useEffect } from "react";
import firebaseconfig from "./firebase-config.js"; 

const LogOutDoctors = () => {

const { currentUser } = useContext(AuthContext);
const db = firebaseconfig.firestore();

useEffect(() => {
  const searchUser = async () => {
     const nameCollection = await db.collection("info").doc(currentUser.bc.email).get();
     if(nameCollection.data().profesion === "pacientes"){
      firebaseconfig.auth().signOut()

      
      } 
  };
  searchUser();
}, []);

   
}



    

export default LogOutDoctors 

