import React, { useEffect } from "react";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormSex(props){

    const [sex, setSex] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchSex = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().sexo !== null){
            setSex(
              nameCollection.data().sexo
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().sexo === null){
                setSex(
                    ""
               );
                }
          
        };
        searchSex();
      }, []);

      const saveButtonFunction = () =>{
        setSelectedOption(false);
        setSaveButton(false);
      }


      const submitData = (event => {
        event.preventDefault();
          const {sexo} = event.target.elements;
        if (sexo.value !== "" && sexo.value !== "Seleccione una especialidad"){
            setSex(
                sexo.value
             );
             db.collection("info").doc(props.user).update({sexo: sexo.value});
             setSelectedOption(true);
             setSaveButton(true);

          }
      })


    return (
        <div>
            <div className="form-title">Sexo:</div>
            <div className="form-value">{sex}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<select onChange={saveButtonFunction} type="text" autoComplete="off" class="custom-select select-input profession-input  col-lg-9 col-md-12 col-12" id="sexo" name="sexo">
<option className="disabled-option" disabled="true" selected={selectedOption}>Seleccione su sexo</option>
<option >Masculino</option>
<option >Femenino</option>
</select>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormSex