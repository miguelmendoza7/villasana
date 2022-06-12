import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormSchool(props){

    const [school, setSchool] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [schoolInput, setSchoolInput] = React.useState("");

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchSchool = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().facultad !== null){
            setSchool(
              nameCollection.data().facultad
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().profesion === null){
                setSchool(
                    ""
               );
                }
          
        };
        searchSchool();
      }, []);

      const saveButtonFunction = (event) =>{
        setSchoolInput(event.target.value);
        setSaveButton(false);
      }


      const submitData = (event => {
        event.preventDefault();
          const {escuela} = event.target.elements;
        if (escuela.value !== "" && escuela.value !== "Seleccione una especialidad"){
            setSchool(
                escuela.value
             );
             db.collection("info").doc(currentUser.bc.email).update({facultad: escuela.value});
             setSchoolInput("");
             setSaveButton(true);

          }
      })


    return (
        <div>
            <div className="form-title">Facultad de estudio:</div>
            <div className="form-value">{school}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={schoolInput} type="text" autoComplete="off" class=" profession-input col-lg-9 col-md-12 col-12" placeholder="Indique el nombre de la facultad" id="escuela" name="escuela"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button  mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormSchool