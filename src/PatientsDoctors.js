import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./Auth.js";
import SideBarDoctors from "./SideBarDoctors";
import "./Spacing.css"
import LogOutDoctors from "./LogOutDoctors";
import "./PatientsDoctors.css"
import firebaseconfig from "./firebase-config";
import LayoutMyPatientsData from "./LayoutMyPatientsData.js";

const PatientsDoctors = () => {
  LogOutDoctors();

  const titleRef = useRef()

  const { currentUser } = useContext(AuthContext);
  const db = firebaseconfig.firestore();

  const [patients, setPatients] = React.useState([]);
  const [show, setShow] = React.useState("");
  const [name, setName] = React.useState("");


  useEffect(() => {
    const searchMyPatients = async () => {
        const friendsCollection = await  db.collection("info").doc(currentUser.bc.email).collection('pacientes').onSnapshot((snapshot) => {

          setPatients(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        
        
        });

         
      
    };
    searchMyPatients();
  }, []);

  const showData = (email, name) =>{
    setShow(email)
    setName(name)


    titleRef.current.scrollIntoView({ behavior: 'smooth' })




  }

 






    return (
      <>
      <div >
        <SideBarDoctors one={"nav__link"} two={"nav__link"} three={"nav__link"} four={"nav__link active"} five={"nav__link"}>
        </SideBarDoctors>
          <div className="container-spacing">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-xl-3">

                <div className="fixed-bar">
                <div className="title">Mis pacientes</div>
               

                <div className="card display-patients">
                  <div className="container">
                    <div className="friends-text">
                    {patients.map((patient) => {
          return (
            <div  key={patient.email}>
              <div onClick={function(){showData(patient.email, patient.name)}} className="request-user">{patient.name}</div>
              <hr></hr>
            </div>
          );
        })}


             
                    
                    </div>

                </div>

              </div>
              </div>

              </div>

              <div ref={titleRef} className="col-lg-8 col-xl-9">
                <div>
                {(show === "" )&&
                <div className="no-patient-selected mb-4">No se ha seleccionado ningún paciente</div>
            }

{show !== "" &&
<div >
  <LayoutMyPatientsData  button={false}  name={name} user={show}></LayoutMyPatientsData>
</div>                
            }


               

    
                </div>

              


              </div>
            </div>
          </div>
          </div>
        </div>
        
      </>
    );
  };

export default PatientsDoctors;