import React, { useContext } from "react";
import { AuthContext } from "./Auth.js";
import FormSex from "./FormSexPatients";
import FormDate from "./FormDatePatients";
import FormTelephone from "./FormTelephonePatients";
import BloodData from "./BloodDataPatients";
import AllergiesData from "./AllergiesDataPatients";
import ChronicDiseasesData from "./ChronicDiseasesDataPatients";
import AddictionsData from "./AddiccionsDataPatients";
import HealthInsuranceData from "./HealthInsuranceData";
import ConsultsPatientProfilePage from "./ConsultsPatientData.js";

function FormPage(){
    const [form, setForms] = React.useState(true);
    const [ready, setReadyButton] = React.useState(true);
    const [edit, setEditButton] = React.useState(false);

    const { currentUser } = useContext(AuthContext);

    const showForms = () =>{
    setForms(false);
    setReadyButton(false);
    setEditButton(true);
    }
    const hideForms = () =>{
    setForms(true);
    setReadyButton(true);
    setEditButton(false);
    }
return(
    <div >
        <div>
        <FormSex user={currentUser.bc.email} show={form}></FormSex>
        <FormDate  user={currentUser.bc.email} show={form}></FormDate>
        <FormTelephone user={currentUser.bc.email} show={form}></FormTelephone>
        <button className="btn btn-primary edit-information-button  mt-5 mb-4" hidden={edit} onClick={showForms}>Editar información</button>
        <button className="btn btn-primary ready-button mt-5 mb-4" hidden={ready} onClick={hideForms}>Listo</button>
        </div>
        <div>
            <BloodData></BloodData>
            <AllergiesData></AllergiesData>
            <ChronicDiseasesData></ChronicDiseasesData>
            <AddictionsData></AddictionsData>
            <HealthInsuranceData></HealthInsuranceData>
            <br />
        </div>
    </div>  

)
}



export default FormPage