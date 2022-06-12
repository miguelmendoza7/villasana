import React, { useContext } from "react";
import { AuthContext } from "./Auth.js";
import FormDate from "./FormDatePatients.js";
import FormSex from "./FormSexPatients.js";
import FormTelephone from "./FormTelephonePatients.js";
import EditBloodData from "./EditBloodData.js";
import EditAllergiesData from "./EditAllergiesData.js";
import EditChronicDiseasesData from "./EditChronicDiseasesData.js";
import EditAddictionsData from "./EditAddictionsData.js";
import EditHealthInsuranceData from "./EditHealthInsuranceData.js";
import FormConsults from "./SearchPatientsConsults.js";
import GetImage from "./GetImagePatients.js";
import firebaseconfig from "./firebase-config";


function LayoutMyPatientsData (props){
    const { currentUser } = useContext(AuthContext);
  const db = firebaseconfig.firestore();

    const [showInput, setShowInput] = React.useState(true);
    const [consultButton, setConsultButton] = React.useState(false);
    const [hideButton, setHideButton] = React.useState(true);
    const [showConsult, setShowConsult] = React.useState(true);

    


         
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
    
        }

        const deletePatient = (email) =>{
            const patientsCollection =  db.collection("info").doc(currentUser.bc.email).collection('pacientes').where("email", "==", email).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    db.collection('info').doc(currentUser.bc.email).collection('pacientes').doc(doc.id).delete();
                    document.getElementById("layout-data").innerHTML="";
                   // window.location.reload(true);
                     });

                })


           
    
        }


        const showConsultFuction = () =>{
            setShowInput(true)
            setConsultButton(true)
            setHideButton(false)
            setShowConsult(false)
        }


     
       
    

      

      return(
          <div>

    

{(props.user !== "" )  && 

    <div id="layout-data" key={props.user + "layout-data"}>
    
    <div className="">
    <GetImage  key={props.user} user={props.user}></GetImage>
    <div className="patient-name mt-3">{props.name}</div>
    <div className="patient-email">{props.user}</div>
    </div>
    <div className="col-lg-5">
   
    </div>
    <button  onClick={function(){deletePatient(props.user)}} className="btn btn-danger delete-patient mt-3 mb-3">Eliminar paciente</button>



 

    <div className="patients-forms">


        <FormSex key={props.user + "sex"} user={props.user} show={showInput}></FormSex>
        <FormDate key={props.user + "date"} user={props.user} show={showInput}></FormDate>
        <FormTelephone key={props.user + "telephone"} user={props.user} show={showInput}></FormTelephone>
        <EditBloodData key={props.user + "blood"} user={props.user} show={showInput}></EditBloodData>
        <EditAllergiesData key={props.user +  "allergies"} user={props.user} show={showInput}></EditAllergiesData>
        <EditChronicDiseasesData  key={props.user + "chronic"}user={props.user} show={showInput}></EditChronicDiseasesData>
        <EditAddictionsData  key={props.user + "addictions"} user={props.user} show={showInput}></EditAddictionsData>
        <EditHealthInsuranceData key={props.user + "health"} user={props.user} show={showInput}></EditHealthInsuranceData>
        
       

    <div className="center-buttons">
    <button hidden={consultButton} onClick={function(){showInputFunction()}} className="btn ready-button col-lg-3 inline ">Editar perfil </button>
    <button hidden={consultButton} onClick={function(){showConsultFuction()}} className="btn ready-button col-lg-3 inline">Consultar </button>
</div>

    <button hidden={hideButton} onClick={function(){hideInputFunction()}} className="btn ready-button mt-2 mb-3">Listo </button>

<FormConsults  key={props.user + "consults"}  user={props.user} show={showConsult}></FormConsults>
    </div>
    </div>
    }
          </div>
      )


}

export default LayoutMyPatientsData