import React from "react";
import FormProfession from "./FormProfessionDoctors.js";
import FormSchool from "./FormSchoolDoctors.js";
import FormPrice from "./FormPriceDoctors.js";
import FormTelephone from "./FormTelephoneDoctors.js";
import FormJobs from "./FormJobsDoctors.js";

function FormPage(){
    const [form, setForms] = React.useState(true);
    const [ready, setReadyButton] = React.useState(true);
    const [edit, setEditButton] = React.useState(false);
      
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

        <FormProfession show={form}></FormProfession>
        <FormSchool show={form}></FormSchool>
        <FormPrice show={form}></FormPrice>
        <FormTelephone show={form}></FormTelephone>
        <FormJobs show={form}></FormJobs>
        <button className="btn ready-button mt-5" hidden={edit} onClick={showForms}>Editar información</button>
        <button className="btn ready-button mt-5 " hidden={ready} onClick={hideForms}>Listo</button>

    </div>  

)
}



export default FormPage