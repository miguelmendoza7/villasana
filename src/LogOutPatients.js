import { AuthContext } from "./Auth.js";
import { useEffect, useContext } from "react";
import firebaseconfig from "./firebase-config.js"; 

const Logout = () => {

const { currentUser } = useContext(AuthContext);
const db = firebaseconfig.firestore();


   

    useEffect(() => {
      const searchUser = async () => {
         const nameCollection = await db.collection("info").doc(currentUser.bc.email).get();
         if(nameCollection.data().profesion === "equipomedico"){
          firebaseconfig.auth().signOut()

          
          } 
      };
      searchUser();
    }, []);



}
    

export default Logout 

