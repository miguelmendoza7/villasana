import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";

function EditAddictionsData(props){

    const [addictions, setAddictions] = React.useState([]);
    const [addictionsInput, setAddictionsInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchAddictions = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().adicciones !== null){
            setAddictions(
              nameCollection.data().adicciones
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().adicciones === null){
                setAddictions(
                    ""
               );
                }
          
        };
        searchAddictions();
      }, []);

      const saveButtonFunction = (event) =>{
        setAddictionsInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {adicciones} = event.target.elements;
        if (adicciones.value !== "" && adicciones.value !== "Seleccione una especialidad"){
            setAddictions(
                adicciones.value
             );
             db.collection("info").doc(props.user).update({adicciones: adicciones.value});
             setAddictionsInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Adicciones: </div>
            <div className="form-value">{addictions}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={addictionsInput} type="text" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique las adicciones del paciente" id="adicciones" name="adicciones"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default EditAddictionsData