import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";


function EditBloodData(props){

    const [blood, setBlood] = React.useState([]);
    const [saveButton, setSaveButton] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState(true);


    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchBlood = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().sangre !== null){
            setBlood(
              nameCollection.data().sangre
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().sangre === null){
                setBlood(
                    ""
               );
                }
          
        };
        searchBlood();
      }, []);


      const saveButtonFunction = () =>{
        setSelectedOption(false);
        setSaveButton(false);
      }


      const submitData = (event => {
        event.preventDefault();
          const {sangre} = event.target.elements;
        if (sangre.value !== "" && sangre.value !== "Seleccione el tipo de sangre"){
            setBlood(
                sangre.value
             );
             db.collection("info").doc(props.user).update({sangre: sangre.value});
             setSelectedOption(true);
             setSaveButton(true);

          }
      })
    


      


    return (
        <div>
            <div className="form-title">Tipo de sangre:</div>
            <div className="form-value">{blood}</div>

            <div hidden={props.show}>
                <form onSubmit={submitData}>
                <div class="input-group">
                <select onChange={saveButtonFunction} type="text" autoComplete="off" class="custom-select profession-input  col-lg-9 col-md-12 col-12" id="sangre" name="sangre">
                <option className="disabled-option" disabled="true" selected={selectedOption}>Seleccione el tipo de sangre</option>
                <option >O negativo</option>
                <option >O positivo</option>
                <option >A negativo</option>
                <option >A positivo</option>
                <option >B negativo</option>
                <option >B positivo</option>
                <option >AB negativo</option>
                <option >AB positivo</option>
                </select>

                <div class="input-group-append">
               <button disabled={saveButton} class="btn btn-primary input-group-append save-button  mb-4" >Guardar</button>
               </div>

                </div>

                </form>

            </div>


        </div>
    )

}

export default EditBloodData