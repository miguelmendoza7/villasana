import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";


function GetDoctorName(props){

    const [name, setName] = React.useState();

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchName = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
            setName(nameCollection.data().name);     
          
        };
        searchName();
      }, []);

    
    return (
        <div className="consult-text mt-2"><b>Nombre del doctor:</b> {name}</div>
    )

}

export default GetDoctorName