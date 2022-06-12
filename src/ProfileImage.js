import React, { useContext, useEffect } from "react";
import firebaseconfig from "./firebase-config";
import { AuthContext } from "./Auth.js";
import "./ProfileImage.css"
import imgage from "./doctor-313.png"
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";

const db = firebaseconfig.firestore();

function ProfileImage() {
const { currentUser } = useContext(AuthContext);

  const [fileUrl, setFileUrl] = React.useState(null);

  
  const [users, setUsers] = React.useState([]);
  const [modal, setModal] = React.useState(false);



  const today = new Date(),

  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

   
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseconfig.storage().ref();
    const fileRef = storageRef.child(currentUser.bc.email+time);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    setModal(true);
    document.getElementById('upload-photo').value="";

  };


  const closeModal = () =>{
    setModal(false)
    const storageRef = firebaseconfig.storage().refFromURL(fileUrl);
    storageRef.delete();
    setFileUrl(null)  

  }


  const onSubmit = async (e) => {
     await db.collection("users").doc(`${currentUser.bc.email}`).set({
      avatar: fileUrl
    });
    if (users === imgage){

    }
    else{
      const storageRef = firebaseconfig.storage().refFromURL(users);
      storageRef.delete();


    }
    window.location.reload();

  };

  useEffect(() => {
    const fetchUsers = async () => {
       const usersCollection = await db.collection("users").doc(`${currentUser.bc.email}`).get();
       if(usersCollection.data() === undefined || usersCollection.data().avatar === null){
        const userUrl = imgage
        setUsers(
          userUrl
       );

       }
       else if(usersCollection.data() !== undefined){
        const userUrl = usersCollection.data()
        setUsers(
           userUrl.avatar
        );
      }
      //setUsers(
        // usersCollection.data()

      //);
      
    };
    fetchUsers();
  }, []);


  return (
      
      
    <>

<Modal onHide={closeModal} show={modal}>
            <style>{'body { background-color: gray; }'}</style>
            <style>{'input { filter: brightness(50%); }'}</style>
            <style>{'.profile-image { filter: brightness(50%); }'}</style>
            <style>{'input { filter: brightness(40%); }'}</style>

            
            
              <ModalHeader><h2>Confirmar nueva foto de perfil</h2></ModalHeader>
              <ModalBody>
              <div className="container">
                  <img className="img-fluid" src={fileUrl} key={fileUrl}></img>
                  </div>
              </ModalBody>
              <ModalFooter>
              <button onClick={closeModal} className="btn btn-danger mx-auto d-block col-5">Cancelar</button>

                <button onClick={onSubmit} className="btn btn-primary mx-auto d-block col-5">Aceptar</button>

              </ModalFooter>
            </Modal>

   
    <img className="img-fluid img rounded profile-image" key={users} src={users} alt={users}></img>

<div>
  <label for="upload-photo" className="btn file-select  edit-information-button col-lg-10 col-md-10 col-sm-6 col-8">Cambiar imagen
  <input className="custom-file-input" type="file" id="upload-photo" onChange={onFileChange} hidden />
  </label>

</div>



    </>
  );
}

export default ProfileImage;