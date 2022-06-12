import React, {useEffect, useContext} from "react";
import SideBarDoctors from "./SideBarDoctors";
import "./Spacing.css"
import LogOutDoctors from "./LogOutDoctors";
import firebaseconfig from "./firebase-config";
import { AuthContext } from "./Auth.js";
import SearchMedicines from "./SearchMedicines.js";

const ConsultsDoctors = () => {
  LogOutDoctors();

  const [consults, setConsults] = React.useState([]);

  const { currentUser } = useContext(AuthContext);
  const db = firebaseconfig.firestore();


  useEffect(() => {
   

    const searchRequests = async () => {

       const requestsCollection = await  db.collection("info").doc(currentUser.bc.email).collection('consultas').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
           setConsults(snapshot.docs.map((doc) => (doc.data()))

       )});
   
     
   };
   searchRequests();
   
 }, []);




const changeTime = () =>{
  const order = document.getElementById("order").value;
  if (order === "Ordenar por fecha (reciente)"){
    db.collection("info").doc(currentUser.bc.email).collection('consultas').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setConsults(snapshot.docs.map((doc) => (doc.data()))

  )});

  }
  else if (order == "Ordenar por fecha (antiguedad)"){
    db.collection("info").doc(currentUser.bc.email).collection('consultas').orderBy("timestamp", "asc").onSnapshot((snapshot) => {
      setConsults(snapshot.docs.map((doc) => (doc.data()))

  )});
  }

}


    return (
      <>
      <div >
        <SideBarDoctors one={"nav__link "} two={"nav__link"} three={"nav__link active"} four={"nav__link"} five={"nav__link"}> 
        </SideBarDoctors>
          <div className="container-spacing">
          <div className="container">
 <div className="form-title">Consultas médicas: 
          
          </div>

          <select onChange={changeTime} name="order" id="order" className="btn btn-dark filter-button mb-3 mt-3">
          <option disabled selected>Ordenar por</option>
          <option>Ordenar por fecha (reciente)</option>
          <option>Ordenar por fecha (antiguedad)</option>

          </select> 



{ consults.map((consult) => {
return (
<div key={consult.consulta} className="card mb-3">
<div class="card-body">
<blockquote class="blockquote mb-0">
<div className="consult-text">{consult.consulta}</div>
<div className="medicnies">
<SearchMedicines user={consult.paciente}  id={consult.consulta}></SearchMedicines>
</div>
<footer class="blockquote-footer consult-date-name"> {consult.paciente}, {consult.date} </footer>
</blockquote>
</div>
</div>

);
})} 

         </div>
          </div>
        </div>
        
      </>
    );
  };

export default ConsultsDoctors;