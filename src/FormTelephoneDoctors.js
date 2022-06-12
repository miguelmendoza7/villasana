import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormTelephone(props){

    const [telephone, setTelephone] = React.useState([]);
    const [telephoneInput, setTelephoneInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchTelephone = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().telefono !== null){
            setTelephone(
              nameCollection.data().telefono
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().telefono === null){
                setTelephone(
                    ""
               );
                }
          
        };
        searchTelephone();
      }, []);

      const saveButtonFunction = (event) =>{
        setTelephoneInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {numero} = event.target.elements;
        if (numero.value !== "" && numero.value !== "Seleccione una especialidad"){
            setTelephone(
                numero.value
             );
             db.collection("info").doc(currentUser.bc.email).update({telefono: numero.value});
             setTelephoneInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Numero telefónico de consultorio:</div>
            <div className="form-value">{telephone}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={telephoneInput} type="tel" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique el numero telefónico del consultorio" id="numero" name="numero"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormTelephone