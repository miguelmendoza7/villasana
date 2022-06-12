import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";
import imgage from "./doctor-313.png"

function GetImage (props){

    const [img, setUsers] = React.useState([]);

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
          <div className="container mt-5">           
<div className="space2">
<div className="circle2">
<img className="img-fluid" key={img} src={img}></img>
</div>
</div>
          </div>

      )



}

export default GetImage