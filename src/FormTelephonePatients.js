import React, { useEffect } from "react";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormTelephone(props){

    const [telephone, setTelephone] = React.useState([]);
    const [telephoneInput, setTelephoneInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchTelephone = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
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
             db.collection("info").doc(props.user).update({telefono: numero.value});
             setTelephoneInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Numero telefónico de emergencia:</div>
            <div className="form-value">{telephone}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={telephoneInput} type="tel" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique un numero telefónico de emergencia" id="numero" name="numero"></input>
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