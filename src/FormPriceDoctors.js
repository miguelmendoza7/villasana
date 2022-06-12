import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormPrice(props){

    const [price, setPrice] = React.useState([]);
    const [priceInput, setPriceInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);

    const { currentUser } = useContext(AuthContext);

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchPrice = async () => {
           const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
           if(nameCollection.data() !== undefined || nameCollection.data().precio !== null){
            setPrice(
              nameCollection.data().precio
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().precio === null){
                setPrice(
                    ""
               );
                }
          
        };
        searchPrice();
      }, []);

      const saveButtonFunction = (event) =>{
        setPriceInput(event.target.value)
        setSaveButton(false);

      }


      const submitData = (event => {
        event.preventDefault();
          const {dinero} = event.target.elements;
        if (dinero.value !== "" && dinero.value !== "Seleccione una especialidad"){
            setPrice(
                dinero.value + " MXN"
             );
             db.collection("info").doc(currentUser.bc.email).update({precio: dinero.value + " MXN"});
             setPriceInput("")
             setSaveButton(true);


          }
      })


    return (
        <div>
            <div className="form-title">Precio por consulta:</div>
            <div className="form-value">{price}</div>

<div hidden={props.show}>

<form onSubmit={submitData}>
<div class="input-group">
<input onChange={saveButtonFunction} value={priceInput} type="number" autoComplete="off" class="profession-input price-input col-lg-9 col-md-12 col-12" placeholder="Indique el precio por consulta" id="dinero" name="dinero"></input>
  <div class="input-group-append">
    <button disabled={saveButton} class="btn btn-primary input-group-append save-button mb-4" >Guardar</button>
  </div>
</div>
</form>

</div>
        </div>





    )

}

export default FormPrice