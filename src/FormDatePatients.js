import React, { useEffect } from "react";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormDate(props){

    const [date, setDate] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [dateInput, setDateInput] = React.useState("");


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchDate = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().fecha !== null){
            setDate(
              nameCollection.data().fecha
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().fecha === null){
                setDate(
                    ""
               );
                }
          
        };
        searchDate();
      }, []);

      const saveButtonFunction = (event) =>{
        setDateInput(event.target.value)
        setSaveButton(false);
      }


      const submitData = (event => {
        event.preventDefault();
          const {fecha} = event.target.elements;
        if (fecha.value !== "" && fecha.value !== "Seleccione una especialidad"){
            setDate(
                fecha.value
             );
             db.collection("info").doc(props.user).update({fecha: fecha.value});
             setSaveButton(true);
             setDateInput("")

          }
      })


    return (
        <div>
            <div className="form-title">Fecha de nacimiento:</div>
            <div className="form-value">{date}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={dateInput} type="date" autoComplete="off" class=" profession-input col-lg-9 col-md-12 col-12" id="fecha" name="fecha"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button  mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormDate