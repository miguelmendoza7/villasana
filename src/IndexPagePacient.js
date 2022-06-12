import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./Spacing.css"
import SideBarPatient from "./SideBarPatients";
import "./LogOutPatients"
import Logout from "./LogOutPatients";
import firebaseconfig from "./firebase-config";
import GetInitialDate from "./GetInitialDate.js";
import GetFinalDate from "./GetFinalDate.js";
import GetDoctorName from "./GetDoctorName.js";
import GetDoctorNumber from "./GetDoctorNumber.js";


const HomePacient = () => {

Logout(); 

const db = firebaseconfig.firestore();

const { currentUser } = useContext(AuthContext);


const [name, setName] = React.useState("");

  const [greeting, setGreeting] = React.useState("");

  const [consults, setConsults] = React.useState([]);

  const today = new Date().toISOString()

  useEffect(() => {
    const searchName = async () => {
       const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();

       const doctorFullName = nameCollection.data().name;
       const details = doctorFullName.split(' ');
       setName(details[0])
       dateFunction();
      
    };
    searchName();
  }, []);




  useEffect(() => {
    const searchRequests = async () => {

      const requestsCollection = await  db.collection("info").doc(currentUser.bc.email).collection('consultasAgendadas').orderBy('start').startAt(today).onSnapshot((snapshot) => {
          setConsults(snapshot.docs.map((doc) => (doc.data()))
          

      ) });  
  };
  searchRequests();
  
  }, [ ]);





 


  const dateFunction = () => {
    const date = new Date;
    const hours = date.getHours();
  
    if (hours < 12){
      setGreeting("Buenos días, ")
  
  
    }
    else if (hours >= 12 && hours < 18){
      setGreeting("Buenas tardes, ")
  
  
    }
    else if (hours >= 18 && hours <= 24){
      setGreeting("Buenas noches, ")
  
      
    }
  }


    return (
      <>
<SideBarPatient one={"nav__link active"} two={"nav__link"} three={"nav__link"} four={"nav__link"} five={"nav__link"}></SideBarPatient>
        <div className="container-spacing">
          <div className="container">
        <div className="h1 greeting">{greeting + name}</div>


        {( consults.length === 0)  && 
<div className="mt-4 h5">No hay consultas médicas agendadas</div>
}

{( consults.length !== 0)  && 
<div className="mt-4 h5">Consultas médicas agendadas: </div>
}


<div id="consults" className="row mt-2">
        { consults.map((consult) => {
return (
<div key={consult.start + consult.end} className="col-lg-6">
<div  className="card card-backround mb-3">
<div class="card-body">
<blockquote class="blockquote">
<GetDoctorName user={consult.title}></GetDoctorName>
<div className="consult-text mt-2"><b>Correo electrónico del doctor:</b> {consult.title}</div>
<GetDoctorNumber user={consult.title}></GetDoctorNumber>
<GetInitialDate date={consult.start}></GetInitialDate>
<GetFinalDate date={consult.end}></GetFinalDate>
</blockquote>
</div>
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

export default HomePacient;