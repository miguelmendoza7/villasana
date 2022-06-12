import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";


function BloodData(){

    const [blood, setBlood] = React.useState([]);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchBlood = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().sangre !== null){
            setBlood(
              nameCollection.data().sangre
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().sangre === null){
                setBlood(
                    ""
               );
                }
          
        };
        searchBlood();
      }, []);

    


      


    return (
        <div>
            <div className="form-title">Tipo de sangre:</div>
            <div className="form-value">{blood}</div>


        </div>
    )

}

export default BloodData