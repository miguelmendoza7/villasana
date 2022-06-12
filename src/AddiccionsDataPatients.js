import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";


function AddictionsData(){

    const [addicions, setAddiccions] = React.useState([]);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchAdiccions = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().adicciones !== null){
            setAddiccions(
              nameCollection.data().adicciones
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().adicciones === null){
                setAddiccions(
                    ""
               );
                }
          
        };
        searchAdiccions();
      }, []);

    


      


    return (
        <div>
            <div className="form-title">Adicciones:</div>
            <div className="form-value">{addicions}</div>


        </div>
    )

}

export default AddictionsData