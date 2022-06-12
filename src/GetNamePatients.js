import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";


function GetName(props){

    const [name, setName] = React.useState();

    const db = firebaseconfig.firestore();

    useEffect(() => {
        const searchName = async () => {
           const nameCollection = await db.collection("info").doc(props.user).get();
           if(nameCollection.data() !== undefined || nameCollection.data().name !== null){
            setName(
              nameCollection.data().name
           );
            }
            else if(nameCollection.data() !== undefined || nameCollection.data().name === null){
                setName(
                    ""
               );
                }
          
        };
        searchName();
      }, []);

    
    return (
        <div>{name} </div>
    )

}

export default GetName