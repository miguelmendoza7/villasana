import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";
import imgage from "./doctor-313.png"

function GetAllDoctorsData(props){
    const db = firebaseconfig.firestore();
const [name, setName] = React.useState("");
const [telephone, setTelephone] = React.useState("");
const [price, setPrice] = React.useState("");
const [school, setSchool] = React.useState("");
const [speciality, setSpeciality] = React.useState("");
const [jobs, setJobs] = React.useState("");
const [image, setImage] = React.useState("");


useEffect(() => {
    const searchName = async () => {
        const nameCollection = await db.collection("info").doc(props.user).get();
        setName(nameCollection.data().name)
    } 
    searchName();
  }, []);

  useEffect(() => {
    const searchTelephone = async () => {
        const telephoneCollection = await db.collection("info").doc(props.user).get();
        setTelephone(telephoneCollection.data().telefono)
    } 
    searchTelephone();
  }, []);

  useEffect(() => {
    const searchPrice = async () => {
        const priceCollection = await db.collection("info").doc(props.user).get();
        setPrice(priceCollection.data().precio)
    } 
    searchPrice();
  }, []);

  useEffect(() => {
    const searchSchool = async () => {
        const schoolCollection = await db.collection("info").doc(props.user).get();
        setSchool(schoolCollection.data().facultad)
    } 
    searchSchool();
  }, []);

  useEffect(() => {
    const searchSpeciality = async () => {
        const specialityCollection = await db.collection("info").doc(props.user).get();
        setSpeciality(specialityCollection.data().especialidad)
    } 
    searchSpeciality();
  }, []);

  useEffect(() => {
    const searchJobs = async () => {
        const jobsCollection = await  db.collection("info").doc(props.user).collection('cargosLaborales').onSnapshot((snapshot) => {
            setJobs(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))

        )});
                        //setJobs(
            //    jobsCollection.docs.map((doc) => {
             //    return doc.data();
             // })
             // );    
      
    };
    searchJobs();
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
       const usersCollection = await db.collection("users").doc(props.user).get();
       if(usersCollection.data() === undefined || usersCollection.data().avatar === null){
        const userUrl = imgage
        setImage(
          userUrl
       );

       }
       else if(usersCollection.data() !== undefined){
        const userUrl = usersCollection.data()
        setImage(
           userUrl.avatar
        );
      }
      //setUsers(
        // usersCollection.data()

      //);
      
    };
    fetchUsers();
  }, []);


  return(
      <div>
      <div >
          <h3>{name}</h3> 
    </div>
    <div className="mb-4">{props.user}</div>
    <div className="space2 mb-4">
<div className="circle2">
<img className="img-fluid" key={image} src={image}></img>
</div>
</div>
    <div className=" modal-text">
    <div className="mb-2">
        <b>Especialidad:</b> {speciality}  
    </div>
    <div className="mb-2">
        <b>Telefóno de consultorio:</b> {telephone}  
    </div>

    <div className="mb-2">
        <b>Precio por consulta médica:</b> {price}  
    </div>
    <div className="mb-2">
        <b>Facultad de estudios:</b> {school}  
    </div>

<div> <b>Cargos laborales: </b>
    <ul className="mt-2"> 
              {(jobs !== "") && jobs.map((job) => {
          return (
            <div  key={job.trabajo}>
                <li>
              <p >{job.trabajo}</p>

              </li>
            </div>
          );
        })}
              </ul>
              </div>
    
    </div>

    </div>

  )

}

export default GetAllDoctorsData