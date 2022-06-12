import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";

function EditAllergiesData(props){

    const [allergies, setAllergies] = React.useState([]);
    const [allergiesInput, setAllergiesInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchAllergies = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().alergias !== null){
            setAllergies(
              nameCollection.data().alergias
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().alergias === null){
                setAllergies(
                    ""
               );
                }
          
        };
        searchAllergies();
      }, []);

      const saveButtonFunction = (event) =>{
        setAllergiesInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {alergias} = event.target.elements;
        if (alergias.value !== "" && alergias.value !== "Seleccione una especialidad"){
            setAllergies(
                alergias.value
             );
             db.collection("info").doc(props.user).update({alergias: alergias.value});
             setAllergiesInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Alergias: </div>
            <div className="form-value">{allergies}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={allergiesInput} type="text" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique las alergias del paciente" id="alergias" name="alergias"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default EditAllergiesData