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
    <option >M??dico General</option>
    <option >M??dico Cirujano</option>
    <option>M??dico Forense</option>
    <option>Medicina de rehabilitaci??n</option>
    <option>Medicina del deporte</option>
    <option>Alergolog??a</option>
    <option>Anestesiolog??a</option>
    <option>Angiolog??a</option>
    <option>Cardiolog??a</option>
    <option>Endocrinolog??a</option>
    <option>Estomatolog??a</option>
    <option>Gastroenterolog??a</option>
    <option>Gen??tica</option>
    <option>Geriatr??a</option>
    <option>Hematolog??a</option>
    <option>Hepatolog??a</option>
    <option>Infectolog??a</option>
    <option>Nefrolog??a</option>
    <option>Neumolog??a</option>
    <option>Nutriolog??a</option>
    <option>Neurolog??a</option>
    <option>Oncolog??a</option>
    <option>Pediatr??a</option>
    <option>Psiquiatr??a</option>
    <option>Reumatolog??a</option>
    <option>Toxicolog??a</option>
    <option>Dermatolog??a</option>
    <option>Ginecolog??a</option>
    <option>Oftamolog??a</option>
    <option>Otorrinolaringolog??a</option>
    <option>Traumatolog??a</option>
    <option>Urolog??a</option>
    <option>Radiolog??a</option>

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