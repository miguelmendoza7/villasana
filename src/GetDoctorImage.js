import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";
import "./ProfileImage.css"
import imgage from "./doctor-313.png"


function GetDoctorImage(props) {

  const [users, setUsers] = React.useState([]);
  const db = firebaseconfig.firestore();


 

  useEffect(() => {
    const fetchUsers = async () => {
       const usersCollection = await db.collection("users").doc(props.user).get();
       if(usersCollection.data() === undefined || usersCollection.data().avatar === null){
        const userUrl = imgage
        setUsers(
          userUrl
       );

       }
       else if(usersCollection.data() !== undefined){
        const userUrl = usersCollection.data()
        setUsers(
           userUrl.avatar
        );
      }
      //setUsers(
        // usersCollection.data()

      //);
      
    };
    fetchUsers();
  }, []);


  return (
      
      
    <>

    <div className="space">
      <div className="circle">
    <img className="img-fluid " key={users} src={users} alt={users}></img>
    </div>
    </div>



    </>
  );
}

export default GetDoctorImage;