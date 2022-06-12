import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import SideBarPatient from "./SideBarPatients";
import "./Spacing.css"
import Logout from "./LogOutPatients";
import "./PrivacyPagePatients.css"
import firebaseconfig from "./firebase-config";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalProfession from "./ModalProfession.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import GetName from "./GetNamePatients.js";
import CheckUserStatus from "./CheckUserStatus.js";

const PrivacyPatients = () => {
  Logout();
  
  const { currentUser } = useContext(AuthContext);
  const db = firebaseconfig.firestore();


  const [requests, setRequests] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  const [modalTitle, setModalTitle] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [pacientEmail, setPacientEmail] = React.useState("");
  const [dataSended, setDataSended] = React.useState(false);
  const [searchButton, setSearchButton] = React.useState(true);


  const [activateButton, setActivateButton] = React.useState(true);
  const [desactivateButton, setDesactivateButton] = React.useState(true);

  const handleClose = () => setModal(false);

  useEffect(() => {
    const searchStatus = async () => {
       const nameCollection = await db.collection("info").doc(`${currentUser.bc.email}`).get();
       if( nameCollection.data().monetizar === "si"){
        setActivateButton(
          true
       );
       setDesactivateButton(
        false
     );
        }
        else {
          setActivateButton(
            false
         );
         setDesactivateButton(
          true
       );
            }
      
    };
    searchStatus();
  }, []);

  useEffect(() => {
    const searchRequests = async () => {

        const requestsCollection = await  db.collection("info").doc(`${currentUser.bc.email}`).collection('solicitudes').onSnapshot((snapshot) => {
            setRequests(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

        )});
    
      
    };
    searchRequests();
  }, []);

  useEffect(() => {
    const searchFriends = async () => {
        const friendsCollection = await  db.collection("info").doc(`${currentUser.bc.email}`).collection('amigos').onSnapshot((snapshot) => {
            setFriends(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        )});
         
      
    };
    searchFriends();
  }, []);




  


  const showModal = (email) =>{
    setModalTitle(email)

    setModal(true)

  
    }




  const deleteFriend = (name, id) =>{

    db.collection('info').doc(currentUser.bc.email).collection('amigos').doc(id).delete();

    const friendsCollection =  db.collection("info").doc(name).collection('amigos').where("amigo", "==", currentUser.bc.email).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection('info').doc(name).collection('amigos').doc(doc.id).delete();
           });
      })

   

      const pacientsCollections =  db.collection("info").doc(name).collection('pacientes').where("email", "==", currentUser.bc.email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('info').doc(name).collection('pacientes').doc(doc.id).delete();
             });
        })

    }


    const deleteRequest =  (id) =>{
      db.collection('info').doc(currentUser.bc.email).collection('solicitudes').doc(id).delete();
      }

      const acceptRequest =  (email, id) =>{
        db.collection('info').doc(currentUser.bc.email).collection('solicitudes').doc(id).delete();

        db.collection('info').doc(currentUser.bc.email).collection('amigos').add({amigo: email})
        db.collection('info').doc(email).collection('amigos').add({amigo: currentUser.bc.email})

        const pacientsCollections =  db.collection("info").doc(email).collection('solicitudes').where("email", "==", currentUser.bc.email).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            db.collection('info').doc(email).collection('solicitudes').doc(doc.id).delete();
               });
          })


        }

        const searchButtonFunction = () =>{
          setSearchButton(false);
         
        
        }

        const monetizeData = () => {
          db.collection('info').doc(currentUser.bc.email).update({monetizar: "si"})
          setActivateButton(
            true
         );
         setDesactivateButton(
          false
       );
        }


        const stopMonetizeData = () =>{
          db.collection('info').doc(currentUser.bc.email).update({monetizar: "no"})
          setActivateButton(
            false
         );
         setDesactivateButton(
          true
       );
        }

        const checkUser = (event) =>{
          event.preventDefault();
          setDataSended("")
          setPacientEmail("")
          const {email} = event.target.elements;
      
          const User = db.collection("pacientes").where("email", "==", email.value).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                  setPacientEmail(doc.data().email)
                  setDataSended(true)
      
                
                
            });
      
            setDataSended(true)
      
           
          })}

          if (pacientEmail === "" ){
            setPacientEmail("Usuario no encontrado")
        
          }

    return (
      <>
      <div >
        <SideBarPatient one={"nav__link"} two={"nav__link"} three={"nav__link"} four={"nav__link active"} five={"nav__link"}></SideBarPatient>
          <div className="container-spacing">
            <Modal show={modal}  onHide={handleClose}>
            <style>{'body { background-color: gray; }'}</style>
            <style>{'.box-requests { background-color: gray; }'}</style>
            <style>{'.delete-request-button { filter: brightness(70%); }'}</style>
            <style>{'.accept-request-button { filter: brightness(70%); }'}</style>
            <style>{'input { filter: brightness(50%); }'}</style>

           

              <ModalHeader><FontAwesomeIcon icon={faTimes} onClick={handleClose}></FontAwesomeIcon></ModalHeader>
              <ModalBody>
                  <ModalProfession user={modalTitle}></ModalProfession>
              </ModalBody>
              <ModalFooter>
                <Button className="modal-button" onClick={handleClose}>Cerrar</Button>
              </ModalFooter>
            </Modal>
          <div className="container">
         
         

          <div className="row">
       
            <div className="col-xl-7 col-lg-6 col-md-6">
            
                      
            <div className="mt-2 search-user-text mb-2">Buscar usuario</div>

<form onSubmit={checkUser}>
 <div class="input-group search-bar ">

 <input type="email" onChange={searchButtonFunction} id="email" name="email" autoComplete="off" class="col-lg-10 col-md-10 col-10 search-user-input" placeholder="Ingrese el correo electrónico" ></input>
<div class="input-group-append">
  <button disabled={searchButton} type="submit" class="btn input-group-append search-button search-user"> <FontAwesomeIcon aria-hidden="true"  icon={faSearch}></FontAwesomeIcon></button>
</div>

</div>
</form>


{(dataSended === true && pacientEmail === "Usuario no encontrado")  && 
<div className="not-user-found mt-5">{pacientEmail}</div>
}

{(pacientEmail !== "Usuario no encontrado" && pacientEmail !== "")  && 

<div className="card-presentation">
<div className=" patient-name"><GetName user={pacientEmail}></GetName></div>
<div className=" patient-email">{pacientEmail}</div>
<CheckUserStatus user={pacientEmail}></CheckUserStatus>



</div>

}    
          
            </div>

            <div className="col-xl-5 col-lg-6 col-md-6">

            <div className="card mt-5 mb-5 box-requests">
           <div className="card-body">
            <div className="card-title text-center pt-3"><b>Monetización de mi información</b></div>
            <div  hidden={activateButton}>
            <button onClick={function(){monetizeData()}} className="btn btn-primary mx-auto d-block">Activar</button>
            </div>
            <div  hidden={desactivateButton}>
            <button onClick={function(){stopMonetizeData()}}   className="btn btn-danger  mx-auto d-block">Desactivar</button>
            </div>

            </div>
        </div>


           <div className="card mt-5 box-requests">
           <div className="card-body">

            <div className="card-title text-center pt-3"><b>Solicitudes de acceso</b></div>
              <ul>
              {requests.map((request) => {
          return (
            <div  key={request.email}>
                <li>
              <p onClick={function(){showModal(request.email)}} className="mt-4 request-user">{request.email}</p>
    <button onClick={function(){deleteRequest(request.id)}}  class="btn btn-danger delete-request-button" >Rechazar</button>
    <button  onClick={function(){acceptRequest(request.email, request.id)}} class="btn btn-primary accept-request-button" >Aceptar</button>

              </li>
            </div>
          );
        })}
        </ul>
        </div>
        </div>




        <div className="card mt-5 mb-5 box-requests">
           <div className="card-body">
            <div className="card-title text-center pt-3"><b>Usuarios con acceso a mi información</b></div>
            <ul>
            {friends.map((friend) => {
          return (
            <div  key={friend.amigo}>
                <li>
              <p onClick={function(){showModal(friend.amigo)}} className="mt-4 request-user">{friend.amigo}</p>
    <button  onClick={function(){deleteFriend(friend.amigo, friend.id)}}  class="btn btn-danger delete-request-button" >Eliminar</button>
              </li>
            </div>
          );
        })}

            </ul>
            </div>
        </div>

    

           </div>

          </div>

          </div>
          </div>
        </div>
        
      </>
    );
  };

export default PrivacyPatients;