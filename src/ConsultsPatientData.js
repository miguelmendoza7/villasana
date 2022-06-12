import React, { useEffect } from "react";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function ConsultsPatientProfilePage(props){
    const db = firebaseconfig.firestore();
    
    const [consults, setConsults] = React.useState([]);



    useEffect(() => {
   

         const searchRequests = async () => {

            const requestsCollection = await  db.collection("info").doc(props.user).collection('consultas').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setConsults(snapshot.docs.map((doc) => (doc.data()))
    
            )});
        
          
        };
        searchRequests();
        
      }, []);

    
    

   
     



      return(
          <div>

              <div className="form-title mb-3">Consultas médicas:</div>

                  { consults.map((consult) => {
        return (
           
<div key={consult.consulta } className="card mb-3">
<div class="card-body">
<blockquote class="blockquote mb-0">
  <p>{consult.consulta}</p>
  <footer class="blockquote-footer"> {consult.doctor}, {consult.date} </footer>
</blockquote>
</div>
</div>
          
        );
      })}
       
           

        
          </div>


      )

}



export default  ConsultsPatientProfilePage