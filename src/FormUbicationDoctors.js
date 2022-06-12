import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function UbicationDoctors(props){

    const [ubication, setUbication] = React.useState("");

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchProfession = async () => {
           const nameCollection = await db.collection("info").doc(currentUser.bc.email).get();
           if(nameCollection.data() !== undefined || nameCollection.data().ubicacion !== null){
            setUbication(
              nameCollection.data().ubicacion
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().ubicacion === null){
                setUbication(
                    ""
               );
                }
          
        };
        searchProfession();
      }, []);

   

     

      const getCurrentUbication = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;


            const geoApiUrl= `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    
    
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {


                
                const oldProfession = document.getElementById('speciality-text').innerHTML;
                const oldLocation = document.getElementById('ubication-text').innerHTML;

                if (oldProfession !== ""){
                    if (oldLocation !== ""){
                        if (props.publicButton === true ){
                            setUbication(data.locality + ", " + data.principalSubdivision);
                            db.collection("info").doc(currentUser.bc.email).update({ubicacion: data.locality + ", " + data.principalSubdivision});
    
                           const patientCollection =  db.collection("doctors").doc(oldProfession).collection(oldLocation).where("email", "==", currentUser.bc.email).get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {            
                            db.collection("doctors").doc(oldProfession).collection(oldLocation).doc(doc.id).delete();
    
                                 });
    
                               }) 
    
                             db.collection("doctors").doc(oldProfession).collection(data.locality + ", " + data.principalSubdivision).add({email: currentUser.bc.email})
    

                        }
                        else if (props.publicButton === false){
                            setUbication(data.locality + ", " + data.principalSubdivision);
                            db.collection("info").doc(currentUser.bc.email).update({ubicacion: data.locality + ", " + data.principalSubdivision});
    

                        }
                       
                       

                    }

                    else if (oldLocation === ""){


                        setUbication(data.locality + ", " + data.principalSubdivision);
                        db.collection("info").doc(currentUser.bc.email).update({ubicacion: data.locality + ", " + data.principalSubdivision});


                    }

                }

                else if (oldProfession === ""){
                    setUbication(data.locality + ", " + data.principalSubdivision);
                    db.collection("info").doc(currentUser.bc.email).update({ubicacion: data.locality + ", " + data.principalSubdivision});


                }
               


                props.parentCallback(data.locality + ", " + data.principalSubdivision);

            })
    
        });
    }


   


    return (
        <div>
            <div className="form-title">Ubicación:</div>
            <div id="ubication-text" className="form-value">{ubication}
            </div>

<div hidden={props.show}>
<button onClick={getCurrentUbication} class="btn btn-primary input-group-append save-button mb-4">Actualizar ubicación</button>


</div>
        </div>





    )

}

export default UbicationDoctors