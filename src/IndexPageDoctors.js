import React , { useContext, useEffect, Component } from "react";
import SideBarDoctors from "./SideBarDoctors";
import "./Spacing.css"
import { AuthContext } from "./Auth.js";
import LogOutDoctors from "./LogOutDoctors";
import firebaseconfig from "./firebase-config";
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from "moment"
import 'react-big-calendar/lib/css/react-big-calendar.css';
require("moment/locale/es.js")

const HomeDoctors = () => {

  LogOutDoctors();
  const localizer = momentLocalizer(moment)

  const db = firebaseconfig.firestore();

  const [name, setName] = React.useState("");
  const [greeting, setGreeting] = React.useState("");
  const [myEventsList, setMyEventList] = React.useState([]);

  const { currentUser } = useContext(AuthContext);



  useEffect(() => {
    const searchRequests = async () => {

      const requestsCollection = await  db.collection("info").doc(currentUser.bc.email).collection('consultasAgendadas').onSnapshot((snapshot) => {
          setMyEventList(snapshot.docs.map((doc) => (doc.data()))
          

      ) });

      

   
    
  };
  searchRequests();
  
  }, [ ]);


  myEventsList.forEach(cita => {
    cita.start =  new Date(cita.start)
    cita.end =  new Date(cita.end)
});
 
  


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

const submitData = () =>{
  const email = document.getElementById('email').value;
  const firstDate = document.getElementById('firstDate').value;
  const secondDate = document.getElementById('secondDate').value;

 

  if (email !== "" && firstDate !== "" && secondDate !== ""){
   

   db.collection("info").doc(currentUser.bc.email).collection('consultasAgendadas').add({title: email, start: firstDate, end: secondDate});
   db.collection("info").doc(email).collection('consultasAgendadas').add({title: currentUser.bc.email, start: firstDate, end: secondDate});

   document.getElementById('email').value = "";
   document.getElementById('firstDate').value = "";
   document.getElementById('secondDate').value = "";

  }
  else {
    alert('Llene todos los campos requeridos para agendar la consulta médica.')
  }

}


    return (
      <>
      <div >
        <SideBarDoctors one={"nav__link active"} two={"nav__link"} three={"nav__link"} four={"nav__link"} five={"nav__link"}></SideBarDoctors>
        <div className="container-spacing">
          <div className="container">
        <div className="h1 greeting">{greeting + name}</div>
       

        <div style={{ height: `${500}px` }} className="bigCalendar-container mt-4">

        <Calendar localizer={localizer}
          startAccessor="start"
          endAccessor="end"
           events={myEventsList}

           //defaultView={['agenda']}

          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            allDay: "Todo el diá",
            month: "Mes",
            week: "Semana",
            day: "Día",
            date: "Fecha",
            time: "Tiempo",
            noEventsInRange: "No hay consultas médicas próximas",
            event: "Correo electrónico del paciente",
            showMore: function showMore(total) {
              return '+' + total ;
            }
          }}>

            
          </Calendar>





<div className="row">

<div className="row col-lg-11 mt-3">
  
<div className="col-lg-4"> 
          <input required className="mt-2 form-control  col-lg-12 col-lg-6 col-12" placeholder="Correo electrónico del paciente" id="email" type="email"></input>
          </div>
         <div className="col-lg-4"> 
           Inicio: <input required className="mt-3 col-lg-9" placeholder="Fecha inicial" type="datetime-local" id="firstDate"></input>
          </div>
          <div className="col-lg-4 "> 
        Final:  <input required className="mt-3 col-lg-9" placeholder="Fecha final" type="datetime-local" id="secondDate"></input>
        </div>
        </div>
        <div className="col-lg-1">
        <button onClick={submitData} className="btn btn-primary  mt-4  margin-right">Guardar </button>
        </div>
        </div>





          </div>

            </div>

        </div>
        </div>
        
      </>
    );
  };

export default HomeDoctors;