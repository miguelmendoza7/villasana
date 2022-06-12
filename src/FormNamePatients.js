import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormName(props){

    const [name, setName] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [nameInput, setNameInput] = React.useState("");

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchName = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().name !== null){
            setName(
              nameCollection.data().name
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().name === null){
                setName(
                    ""
               );
                }
          
        };
        searchName();
      }, []);

      const saveButtonFunction = (event) =>{
        setNameInput(event.target.value);
        setSaveButton(false);
      }


      const submitData = (event => {
        event.preventDefault();
          const {name} = event.target.elements;
        if (name.value !== "" && name.value !== "Seleccione una especialidad"){
            setName(
                name.value
             );
             db.collection("info").doc(currentUser.bc.email).update({name: name.value});
             setNameInput("");
             setSaveButton(true);

          }
      })


    return (
        <div>
            <div className="form-title">Nombre:</div>
            <div className="form-value">{name}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={nameInput} type="text" autoComplete="off" class=" profession-input col-lg-9 col-md-12 col-12" placeholder="Indique su nombre" id="name" name="name"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button  mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>
    )

}

export default FormName