import React, {useEffect} from "react";
import firebaseconfig from "./firebase-config.js"; 
import { Modal } from "react-bootstrap";

import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
  function SearchMedicinesPatientView(props) {

  const [consultId, setConsultId] = React.useState([]);
  const [medicnes, setMedicines] = React.useState([]);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [location, setLocation] = React.useState(false);


  const db = firebaseconfig.firestore();

  useEffect(() => {
   
    const searchRequests = async () => {
     
   const requestscollection = await db.collection("info").doc(props.user).collection('consultas').where("consulta", "==", props.id).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        setConsultId(doc.id)

      db.collection("info").doc(props.user).collection('consultas').doc(doc.id).onSnapshot((snapshot) => {
            setMedicines(doc.data().medicinas)

        });

          

         });
    }) 
};
   searchRequests();
   
 }, []);


 const showMedicine = (medicine) =>{
    setModalTitle(medicine)
     setModal(true)
     if (!location){
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            const geoApiUrl= `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        
        
            fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
              setLocation(data.locality + ", " + data.principalSubdivision)
        
            })
            
          });

     }
  

 }

 const hideMedicine = () =>{
    setModalTitle("")
    setModal(false)

}


 

 


  

return (
    <div>
      <style>{'.medicine-data { cursor: pointer; }'}</style>

        


      <Modal show={modal}  onHide={function(){hideMedicine()}}>
      <style>{'body { background-color: gray; }'}</style>
            <style>{'.box-requests { background-color: gray; }'}</style>
            <style>{'.box-requests { background-color: gray; }'}</style>
            <style>{'.medical-card { background-color: gray; }'}</style>

            
            <style>{'.delete-request-button { filter: brightness(70%); }'}</style>
            <style>{'.accept-request-button { filter: brightness(70%); }'}</style>
            <style>{'input { filter: brightness(50%); }'}</style>
            <style>{'.green-dot {color: green;}'}</style>
            <style>{'.green-dot span {color: black}'}</style>



   
      <ModalHeader>
          <div><b>Medicamento: </b>{modalTitle}</div>
      </ModalHeader>
      <ModalBody>
          {!location && 
          <div>
              Localizando...
          </div>
          }
          {location &&
             <div>
           
        <div className="mb-3">Farmacias con medicamento disponible en: <b>{location}</b> </div>
         <li className="green-dot"><span>
             Farmacia Benavides Diagonal Reforma
             </span>
         </li>
         <li className="green-dot"><span>
             Farmacia Similares Vasconcelos
             </span>
         </li>
         <li className="green-dot"><span>
             Farmacia Klyns División del Norte
             </span>
         </li>
         <li className="green-dot"><span>
             Farmacia Klyns Saltillo 400
             </span>
         </li>
         </div>
          
          }
       

      </ModalBody>
     </Modal>
  
    <div className="medicines-text mt-2">
        


  <div>

        { medicnes.length !== 0 &&
        <div>
          <b className=""> Medicamentos: </b>

        { medicnes.map((medicinas) => {
        return (
           
<div  key={medicinas.medicina+medicinas.duracion+medicinas.indicaciones} className=" mb-1">
    <li className="medicine-data"  onClick={function(){showMedicine(medicinas.medicina)}}>{medicinas.medicina + "  " +medicinas.duracion + "  " + medicinas.indicaciones}</li>
    

</div>
          
        );
      })}
          </div>
      }
      <div className="mb-4"></div>

  </div>
  

      
    </div>
    </div>
)
 
  };

export default SearchMedicinesPatientView;