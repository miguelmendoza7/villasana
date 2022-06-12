import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormProfession(props){

    const [profesion, setProfession] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState(true);


    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();


    useEffect(() => {
        const searchProfession = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().especialidad !== null){
            setProfession(
              nameCollection.data().especialidad
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().especialidad === null){
                setProfession(
                    ""
               );
                }
          
        };
        searchProfession();
      }, []);

      

     

      const saveButtonFunction = () =>{
          setSaveButton(false);
          setSelectedOption(false);
        }


      const submitData = (event => {
        event.preventDefault();
          const {especialidad} = event.target.elements;
          db.collection("info").doc(currentUser.bc.email).update({especialidad: especialidad.value});
          setSelectedOption(true);
          setSaveButton(true);
          setProfession(especialidad.value)
      })


    return (
        <div>
            <div className="form-title">Especialidad:</div>
            <div id="speciality-text" className="form-value">{profesion}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
  <select onChange={saveButtonFunction}  class="custom-select profession-input  col-lg-9 col-md-12 col-12" id="especialidad" name="especialidad">
    <option className="disabled-option" disabled="true" selected={selectedOption}>Seleccione una especialidad</option>
    <option >Médico General</option>
    <option >Médico Cirujano</option>
    <option>Médico Forense</option>
    <option>Medicina de rehabilitación</option>
    <option>Medicina del deporte</option>
    <option>Alergología</option>
    <option>Anestesiología</option>
    <option>Angiología</option>
    <option>Cardiología</option>
    <option>Endocrinología</option>
    <option>Estomatología</option>
    <option>Gastroenterología</option>
    <option>Genética</option>
    <option>Geriatría</option>
    <option>Hematología</option>
    <option>Hepatología</option>
    <option>Infectología</option>
    <option>Nefrología</option>
    <option>Neumología</option>
    <option>Nutriología</option>
    <option>Neurología</option>
    <option>Oncología</option>
    <option>Pediatría</option>
    <option>Psiquiatría</option>
    <option>Reumatología</option>
    <option>Toxicología</option>
    <option>Dermatología</option>
    <option>Ginecología</option>
    <option>Oftamología</option>
    <option>Otorrinolaringología</option>
    <option>Traumatología</option>
    <option>Urología</option>
    <option>Radiología</option>

  </select>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormProfession