import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";
import GetAllPatientsData from "./GetAllPatientsData";
import GetAllDoctorsData from "./GetAllDoctorsData";

function ModalProfession(props){
const db = firebaseconfig.firestore();
const [profession, setProfession] = React.useState("");


useEffect(() => {
    const searchProfession = async () => {
        const profesionCollection = await db.collection("info").doc(props.user).get();
        setProfession(profesionCollection.data().profesion)
    } 
    searchProfession();
  }, []);

  return(

    
      <div>

{profession === "equipomedico"  && 
<GetAllDoctorsData user={props.user}></GetAllDoctorsData>
    }
    
{profession === "pacientes"  && 

<div>
        <GetAllPatientsData user={props.user}></GetAllPatientsData>

        </div>
    }
      </div>
  )



}

export default ModalProfession