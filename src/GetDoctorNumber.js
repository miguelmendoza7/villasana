import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";


function GetDoctorNumber(props){

    const [number, setNumber] = React.useState();

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchNumber = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
            setNumber(nameCollection.data().telefono);     
          
        };
        searchNumber();
      }, []);

    
    return (
        <div className="consult-text mt-2"><b>Número telefónico del consultorio:</b> {number}</div>
    )

}

export default GetDoctorNumber