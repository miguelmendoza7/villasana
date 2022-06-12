import React, {useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";
import FormDate from "./FormDatePatients.js";
import FormSex from "./FormSexPatients.js";
import FormTelephone from "./FormTelephonePatients.js";
import EditBloodData from "./EditBloodData.js";
import EditAllergiesData from "./EditAllergiesData.js";
import EditChronicDiseasesData from "./EditChronicDiseasesData.js";
import EditAddictionsData from "./EditAddictionsData.js";
import EditHealthInsuranceData from "./EditHealthInsuranceData.js";
import FormConsults from "./SearchPatientsConsults.js";

function LayoutPatientsData (props){
    const db = firebaseconfig.firestore();
    const { currentUser } = useContext(AuthContext);

    const [patient, setPatient] = React.useState("");
    const [name, setName] = React.useState("");

    const [showInput, setShowInput] = React.useState(true);
    const [consultButton, setConsultButton] = React.useState(false);
    const [hideButton, setHideButton] = React.useState(true);
    const [showConsult, setShowConsult] = React.useState(true);

    
    useEffect(() => {
        const searchPatientStatus =  () => {
            const patientCollection =  db.collection("info").doc(currentUser.bc.email).collection('pacientes').where("email", "==", props.user).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    setPatient(doc.data().email);

                      
                     });


                }) 
    
        };    
        searchPatientStatus();
      
      }, [ ]);


      useEffect(() => {
        const searchName = async () => {
            const nameCollection = await db.collection("info").doc(props.user).get();
             setName(nameCollection.data().name)
            
             
         };
         searchName();
      
      }, [ ]);

         
      const hideInputFunction = () =>{
        setShowInput(true)
        setConsultButton(false)
        setHideButton(true)
        setShowConsult(true)


        }

        const showInputFunction = () =>{
            setShowInput(false)
            setConsultButton(true)
            setHideButton(false)
            setShowConsult(true)

    
        }

        const showConsultFuction = () =>{
            setShowInput(true)
            setConsultButton(true)
            setHideButton(false)
            setShowConsult(false)
        }

        const addPatient = (user) =>{
            db.collection('info').doc(currentUser.bc.email).collection('pacientes').add({email: user, name: name})
            setPatient(user)
          
    
        }
       
    

      

      return(
          <div>
          <div className="row hey">

        {(patient === "" && patient !== props.user )  && 
        <div className="">
        <button onClick={function(){addPatient(props.user)}} className="  space-between-button-search-bar mb-3 btn  ready-button">Añadir a mis pacientes</button>

        </div>
    }
    {(patient !== "" && patient === props.user)  && 
    <div className="">
    
        <button  disabled  className=" mb-3  btn space-between-button-search-bar ready-button">Mi paciente</button>

        </div>  
    }

    <div className="forms-space">
            <div className="col-xl-12">
        <FormSex user={props.user} show={showInput}></FormSex>
        <FormDate user={props.user} show={showInput}></FormDate>
        <FormTelephone user={props.user} show={showInput}></FormTelephone>
        <EditBloodData user={props.user} show={showInput}></EditBloodData>

        <EditAllergiesData user={props.user} show={showInput}></EditAllergiesData>
        <EditChronicDiseasesData user={props.user} show={showInput}></EditChronicDiseasesData>
        <EditAddictionsData user={props.user} show={showInput}></EditAddictionsData>
        <EditHealthInsuranceData user={props.user} show={showInput}></EditHealthInsuranceData>
        </div>  

<div className="center-buttons">
<button hidden={consultButton} onClick={function(){showInputFunction()}} className="btn ready-button col-lg-3 inline">Editar perfil </button>
<button hidden={consultButton} onClick={function(){showConsultFuction()}} className="btn ready-button col-lg-3 inline">Consultar </button>
</div>
<div>
<button hidden={hideButton} id="ready-button" onClick={function(){hideInputFunction()}} className="btn ready-button mb-3  mt-3">Listo </button>

</div>
    </div>
    </div>


    <div className="yesi">

<FormConsults key={props.user + "consults"} user={props.user} show={showConsult}></FormConsults>
</div>

    </div>
      )


}

export default LayoutPatientsData