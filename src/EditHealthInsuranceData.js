import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";

function EditHealthInsuranceData(props){

    const [healthInsurance, setHealthInsurance] = React.useState([]);
    const [healthInsuranceInput, setHealthInsuranceInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchHealthInsurance = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().seguro !== null){
            setHealthInsurance(
              nameCollection.data().seguro
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().seguro === null){
                setHealthInsurance(
                    ""
               );
                }
          
        };
        searchHealthInsurance();
      }, []);

      const saveButtonFunction = (event) =>{
        setHealthInsuranceInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {seguro} = event.target.elements;
        if (seguro.value !== "" && seguro.value !== "Seleccione una especialidad"){
            setHealthInsurance(
                seguro.value
             );
             db.collection("info").doc(props.user).update({seguro: seguro.value});
             setHealthInsuranceInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Seguro de gastos médicos: </div>
            <div className="form-value">{healthInsurance}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={healthInsuranceInput} type="text" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique información sobre el seguro de gastos" id="seguro" name="seguro"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default EditHealthInsuranceData