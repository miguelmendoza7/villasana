import React , {useEffect} from "react";
import firebaseconfig from "./firebase-config";
import GetName from "./GetNamePatients";
import GetDoctorImage from "./GetDoctorImage";
import ModalProfession from "./ModalProfession.js";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function DisplayAllDoctors(props){

    const db = firebaseconfig.firestore();

    const [doctors, setDoctors] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState("");

    const handleClose = () => setModal(false);

    useEffect(() => {
   

        const searchRequests = async () => {

           const requestsCollection = await  db.collection("doctors").doc(props.speciality).collection(props.location).onSnapshot((snapshot) => {
            setDoctors(snapshot.docs.map((doc) => (doc.data()))

   
           )});

         
       };
       searchRequests();
       
     }, []);

     const showModal = (email) =>{
        setModalTitle(email)
    
        setModal(true)
      
        }



    return(
        <div className="container">
        <Modal show={modal}  onHide={handleClose}>
            <style>{'body { background-color: gray; }'}</style>
            <style>{'.box-requests { background-color: gray; }'}</style>
            <style>{'.card { filter: brightness(50%); }'}</style>

            <style>{'select { filter: brightness(50%); }'}</style>

           

              <ModalHeader><FontAwesomeIcon icon={faTimes} onClick={handleClose}></FontAwesomeIcon></ModalHeader>
              <ModalBody>
                  <ModalProfession user={modalTitle}></ModalProfession>
              </ModalBody>
              <ModalFooter>
                <Button className="modal-button" onClick={handleClose}>Cerrar</Button>
              </ModalFooter>
            </Modal>

        <div className="mt-4 row">

{ doctors.map((doctor) => {
        return (

<div key={doctor.email} onClick={function(){showModal(doctor.email)}} className="card content-doctor col-xl-4 col-lg-6 mb-3">
<div class="card-body">
<blockquote class="blockquote mb-0">
    <GetDoctorImage user={doctor.email}></GetDoctorImage>
    <b className="display-doctor-name"><GetName key={doctor.email + " name"} user={doctor.email}></GetName>
</b>
  <div className="display-doctor-email">{doctor.email}</div>
</blockquote>
</div>
</div>

          
        );
      })}

        </div>
        </div>

    )
}

export default DisplayAllDoctors