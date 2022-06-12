import React, { useContext, useEffect } from "react";
import SideBarDoctors from "./SideBarDoctors";
import "./Spacing.css"
import LogOutDoctors from "./LogOutDoctors";
import ProfileImage from "./ProfileImage";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";
import "./ProfilePage.css";
import FormPage from "./FormPageDoctors";

const ProfileDoctors = () => {
  LogOutDoctors();
  //const [name, setName] = React.useState([]);

  const [name, setName] = React.useState([]);

  const { currentUser } = useContext(AuthContext);
  const db = firebaseconfig.firestore();



  useEffect(() => {
    const searchName = async () => {
       const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
       if(nameCollection.data() !== undefined || nameCollection.data().name !== null){
        setName(
          nameCollection.data().name
       );
        }
      
    };
    searchName();
  }, []);
  
    return (
      <>
      <div >
        <SideBarDoctors one={"nav__link"} two={"nav__link"} three={"nav__link"} four={"nav__link"} five={"nav__link active"}>
        </SideBarDoctors>
        <div className="container-spacing">
          <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 ">
            <ProfileImage></ProfileImage>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div >
              <div className="name-text">{name}</div>
              <div className="email-text">{currentUser.bc.email}</div>
              <FormPage></FormPage>
              </div>
            </div>
          </div>
          </div>
          

        </div>
        </div>
        
      </>
    );
  };

export default ProfileDoctors;