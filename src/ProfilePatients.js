import React, { useContext, useEffect } from "react";
import SideBarPatient from "./SideBarPatients";
import "./Spacing.css"
import Logout from "./LogOutPatients";
import firebaseconfig from "./firebase-config";
import { AuthContext } from "./Auth.js";
import ProfileImage from "./ProfileImage";
import FormPage from "./FormPagePatients";

const ProfilePatients = () => {
  Logout();
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
        <SideBarPatient one={"nav__link"} two={"nav__link"} three={"nav__link"} four={"nav__link"} five={"nav__link active"}></SideBarPatient>
          <div className="container-spacing">
          <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4">
            <ProfileImage></ProfileImage>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="">
              <div className="name-text">{name}</div>
              <div className="email-text ">{currentUser.bc.email}</div>
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

export default ProfilePatients;