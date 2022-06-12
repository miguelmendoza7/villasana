import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";


function AllergiesData(){

    const [allergies, setAllergies] = React.useState([]);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchAllergies = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().alergias !== null){
            setAllergies(
              nameCollection.data().alergias
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().alergias === null){
                setAllergies(
                    ""
               );
                }
          
        };
        searchAllergies();
      }, []);

    


      


    return (
        <div>
            <div className="form-title">Alergias:</div>
            <div className="form-value">{allergies}</div>


        </div>
    )

}

export default AllergiesData