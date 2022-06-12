import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";

function EditChronicDiseasesData(props){

    const [chronicDiseases, setChronicDiseases] = React.useState([]);
    const [chronicDiseasesInput, setChronicDiseasesInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchDiseases = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().enfermedades !== null){
            setChronicDiseases(
              nameCollection.data().enfermedades
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().enfermedades === null){
                setChronicDiseases(
                    ""
               );
                }
          
        };
        searchDiseases();
      }, []);

      const saveButtonFunction = (event) =>{
        setChronicDiseasesInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {enfermedades} = event.target.elements;
        if (enfermedades.value !== "" && enfermedades.value !== "Seleccione una especialidad"){
            setChronicDiseases(
                enfermedades.value
             );
             db.collection("info").doc(props.user).update({enfermedades: enfermedades.value});
             setChronicDiseasesInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Enfermedades crónicas: </div>
            <div className="form-value">{chronicDiseases}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={chronicDiseasesInput} type="text" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique las enfermedades crónicas del paciente" id="enfermedades" name="enfermedades"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default EditChronicDiseasesData