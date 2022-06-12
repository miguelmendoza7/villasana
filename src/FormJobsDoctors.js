import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";

function FormJobs(props){
    const { currentUser } = useContext(AuthContext);
    const db = firebaseconfig.firestore();
    const [jobs, setJobs] = React.useState([]);
    const [jobsInput, setJobsInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);


    useEffect(() => {
        const searchJobs = async () => {
    
            const jobsCollection = await  db.collection("info").doc(`${currentUser.bc.email}`).collection('cargosLaborales').onSnapshot((snapshot) => {
                setJobs(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

            )});
                            //setJobs(
                //    jobsCollection.docs.map((doc) => {
                 //    return doc.data();
                 // })
                 // );    
          
        };
        searchJobs();
      }, []);

    
      const saveButtonFunction = (event) =>{
        setJobsInput(event.target.value)
        setSaveButton(false);

      }

      const removeTaskFunction =  (id) => {
        const collectionId =  db.collection("info").doc(currentUser.bc.email).collection('cargosLaborales').doc(id);
        collectionId.delete();
    }
   
     
      const submitData = (event => {
        event.preventDefault();
          const {empleo} = event.target.elements;
             db.collection("info").doc(currentUser.bc.email).collection('cargosLaborales').add({trabajo: empleo.value});
             setJobsInput("")
             setSaveButton(true);
          
      })

      return(
          <div className="">
              <div className="form-title">Cargos laborales:</div>
              <ul className="mt-3">
              {jobs.map((job) => {
          return (
            <div  key={job.trabajo}>
                <li>
              <div className="jobs-text mt-3" >{job.trabajo}
              <button hidden={props.show} onClick={function(){removeTaskFunction(job.id)}} class="btn btn-danger input-group-append delete-button   mt-3 mb-3" >Borrar</button>

              </div>

              </li>
            </div>
          );
        })}
              </ul>

              <div hidden={props.show}>
            <form onSubmit={submitData}>
<div> Añadir cargo laboral
<textarea  onChange={saveButtonFunction} value={jobsInput} type="text" autoComplete="off" className="form-control job-input" placeholder="Indique información del cargo laboral" id="empleo" rows="3" name="empleo"></textarea>
<button disabled={saveButton} class="btn btn-primary save-button  mb-3" >Guardar</button>
</div>
</form>
</div>
        
          </div>


      )

}



export default FormJobs