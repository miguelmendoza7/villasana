import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";


function ChronicDiseasesData(){

    const [diseases, setDiseases] = React.useState([]);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchDiseases = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().enfermedades !== null){
            setDiseases(
              nameCollection.data().enfermedades
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().enfermedades === null){
                setDiseases(
                    ""
               );
                }
          
        };
        searchDiseases();
      }, []);

    


      


    return (
        <div>
            <div className="form-title">Enfermedades crónicas:</div>
            <div className="form-value">{diseases}</div>


        </div>
    )

}

export default ChronicDiseasesData