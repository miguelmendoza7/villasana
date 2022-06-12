import React, {useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";
import ModalProfession from "./ModalProfession.js";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CheckUserStatus (props){
    const db = firebaseconfig.firestore();
    const { currentUser } = useContext(AuthContext);

    const [requests, setRequests] = React.useState("");
    const [friends, setFriends] = React.useState("");
    const [modalTitle, setModalTitle] = React.useState("");
  const [modal, setModal] = React.useState(false);


  const handleClose = () => setModal(false);

    useEffect(() => {

        const searchRequests =  () => {
            const requestscollection =  db.collection("info").doc(props.user).collection('solicitudes').where("email", "==", currentUser.bc.email).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                        setRequests(doc.data().email)  
                      

                     });
                }) 
               
            
        };
        
        searchRequests();


      }, []);



      useEffect(() => {
        
        const searchFriends =  () => {
      const friendsCollection =  db.collection("info").doc(props.user).collection('amigos').where("amigo", "==", currentUser.bc.email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            setFriends(doc.data().amigo)

            

             });
        })
        
    };

    searchFriends();


  }, []);


  const addAccess =  () => {
    db.collection("info").doc(props.user).collection('solicitudes').add({email: currentUser.bc.email});
    setFriends("")
    setRequests(currentUser.bc.email)

    
}
  

const showModal = (email) =>{
    setModalTitle(email)

    setModal(true)

  
    }
            
  


      // console.log(addRequestsButton + "   añadir")
       // console.log(deleteRequestsButton + "   eliminar")
      // console.log(userData + "   data")

        //const searchFriends = async () => {
           // const friendsCollection = await  db.collection("info").doc(props.user).collection('amigos').onSnapshot((snapshot) => {
          //      setFriends(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

         //   )});
       // };
      


      return(
          <div>
                  {(requests === "" && friends !== "")  && 
                  <div className="d-flex justify-content-center">
                  <button onClick={function(){showModal(props.user)}} className="btn btn-success pt-2 pb-2 ">Ver información</button>

                  <Modal show={modal}  onHide={function(){handleClose()}}>
            <style>{'body { background-color: gray; }'}</style>
            <style>{'.box-requests { background-color: gray; }'}</style>
            <style>{'.delete-request-button { filter: brightness(70%); }'}</style>
            <style>{'.accept-request-button { filter: brightness(70%); }'}</style>
            <style>{'input { filter: brightness(50%); }'}</style>

           

              <ModalHeader><FontAwesomeIcon icon={faTimes} onClick={function(){handleClose()}}></FontAwesomeIcon></ModalHeader>
              <ModalBody>
                  <ModalProfession user={modalTitle}></ModalProfession>
              </ModalBody>
              <ModalFooter>
                <Button className="modal-button" onClick={function(){handleClose()}}>Cerrar</Button>
              </ModalFooter>
            </Modal>

                  </div>
                  }
              {(requests === "" && friends === "" )  && 
                      <button onClick={addAccess}   className="btn  ready-button mt-2 mb-4">Enviar solicitud</button>}

             {(requests !== "" && friends === "")  && 
            <button disabled   className="btn ready-button mt-2 mb-4">Solicitud enviada</button>
            }

        

          </div>
      )

    
}

export default CheckUserStatus