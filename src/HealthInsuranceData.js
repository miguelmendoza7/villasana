import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";


function HealthInsuranceData(){

    const [healthInsurance, setHealthInsurance] = React.useState([]);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchHealthInsurance = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().seguro !== null){
            setHealthInsurance(
              nameCollection.data().seguro
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().seguro === null){
                setHealthInsurance(
                    ""
               );
                }
          
        };
        searchHealthInsurance();
      }, []);

    


      


    return (
        <div>
            <div className="form-title">Seguro de gastos médicos:</div>
            <div className="form-value">{healthInsurance}</div>


        </div>
    )

}

export default HealthInsuranceData