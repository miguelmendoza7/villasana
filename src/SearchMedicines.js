import React, {useEffect} from "react";
import firebaseconfig from "./firebase-config.js"; 

  function SearchMedicines(props) {

  const [consultId, setConsultId] = React.useState([]);
  const [medicnes, setMedicines] = React.useState([]);



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



 

 


  

return (

  
    <div className="medicines-text mt-2">
        


  <div>

        { medicnes.length !== 0 &&
        <div>
          <b className=""> Medicamentos: </b>

        { medicnes.map((medicinas) => {
        return (
           
<div className=" mb-1">
    <li>{medicinas.medicina + "  " +medicinas.duracion + "  " + medicinas.indicaciones}</li>
    

</div>
          
        );
      })}
          </div>
      }
      <div className="mb-4"></div>

  </div>
  

      
    </div>
  
)
 
  };

export default SearchMedicines;