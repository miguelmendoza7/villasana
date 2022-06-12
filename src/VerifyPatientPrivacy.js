import React, {useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import firebaseconfig from "./firebase-config";
import LayoutPatientsData from "./LayoutPatientsData.js";

function VerifyPrivacy (props){
    const db = firebaseconfig.firestore();
    const { currentUser } = useContext(AuthContext);

    const [requests, setRequests] = React.useState("");
    const [friends, setFriends] = React.useState("");
   
    //const [userData, setUserData] = React.useState(fals);



    

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
             {(requests === "" && friends === "" )  && 
                      <button onClick={addAccess}   className="btn  ready-button space-between-button-search-bar mb-3">Enviar solicitud</button>}

             {(requests !== "" && friends === "")  && 
            <button disabled   className="btn   ready-button space-between-button-search-bar   mb-3">Solicitud enviada</button>
            }
                  {(requests === "" && friends !== "")  && 
        <LayoutPatientsData user={props.user}></LayoutPatientsData>
    }
             

        

          </div>
      )

    
}

export default VerifyPrivacy