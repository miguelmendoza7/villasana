import React, { useEffect } from "react";
import firebaseconfig from "./firebase-config";
import GetImage from "./GetImagePatients";
import SearchMedicines from "./SearchMedicines";

function GetAllPatientsData(props){
    const db = firebaseconfig.firestore();
const [name, setName] = React.useState("");
const [sex, setSex] = React.useState("");
const [date, setDate] = React.useState("");
const [telephone, setTelephone] = React.useState("");
const [blood, setBlood] = React.useState("");
const [allergies, setAllergies] = React.useState("");
const [diseases, setDiseases] = React.useState("");
const [addiccions, setAddiccions] = React.useState("");
const [healthInsurance, setHealthInsurance] = React.useState("");
const [consults, setConsults] = React.useState([]);


useEffect(() => {
    const searchName = async () => {
        const nameCollection = await db.collection("info").doc(props.user).get();
        setName(nameCollection.data().name)
    } 
    searchName();
  }, []);

  useEffect(() => {
    const searchSex = async () => {
        const sexCollection = await db.collection("info").doc(props.user).get();
        setSex(sexCollection.data().sexo)
    } 
    searchSex();
  }, []);

  useEffect(() => {
    const searchDate = async () => {
        const dateCollection = await db.collection("info").doc(props.user).get();
        setDate(dateCollection.data().fecha)
    } 
    searchDate();
  }, []);

  useEffect(() => {
    const searchTelephone = async () => {
        const telephoneCollection = await db.collection("info").doc(props.user).get();
        setTelephone(telephoneCollection.data().telefono)
    } 
    searchTelephone();
  }, []);

  useEffect(() => {
    const searchBlood = async () => {
        const bloodCollection = await db.collection("info").doc(props.user).get();
        setBlood(bloodCollection.data().sangre)
    } 
    searchBlood();
  }, []);

  useEffect(() => {
    const searchAllergies = async () => {
        const allergiesCollection = await db.collection("info").doc(props.user).get();
        setAllergies(allergiesCollection.data().alergias)
    } 
    searchAllergies();
  }, []);

  useEffect(() => {
    const searchDiseases = async () => {
        const diseasesCollection = await db.collection("info").doc(props.user).get();
        setDiseases(diseasesCollection.data().enfermedades)
    } 
    searchDiseases();
  }, []);

  useEffect(() => {
    const searchAdiccions = async () => {
        const adiccionsCollection = await db.collection("info").doc(props.user).get();
        setAddiccions(adiccionsCollection.data().adicciones)
    } 
    searchAdiccions();
  }, []);

  useEffect(() => {
    const searchHealthInsurance = async () => {
        const healthInsuranceCollection = await db.collection("info").doc(props.user).get();
        setHealthInsurance(healthInsuranceCollection.data().seguro)
    } 
    searchHealthInsurance();
  }, []);



  useEffect(() => {
   

    const searchRequests = async () => {

       const requestsCollection = await  db.collection("info").doc(props.user).collection('consultas').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
           setConsults(snapshot.docs.map((doc) => (doc.data()))

       )});
   
     
   };
   searchRequests();
   
 }, []);

  return(
      <div>
      <div >
          <h3>{name}</h3> 
    </div>
    <div className="mb-2">{props.user}</div>

    <GetImage user={props.user}></GetImage>
    <div className=" modal-text">

    <div className="mt-3 mb-2">
        <b>Sexo:</b> {sex}  
    </div>
    <div className="mb-2">
        <b>Fecha de nacimiento:</b> {date}  
    </div>
    <div className="mb-2">
        <b>Telefóno de emergencia:</b> {telephone}  
    </div>
    <div className="mb-2">
        <b>Tipo de sangre:</b> {blood}  
    </div>
    <div className="mb-2">
        <b>Alergias:</b> {allergies}  
    </div>
    <div className="mb-2">
        <b>Enfermedades crónicas:</b> {diseases}  
    </div>
    <div className="mb-2">
        <b>Adicciones:</b> {addiccions}  
    </div>
    <div className="mb-2">
        <b>Seguro de gastos médicos:</b> {healthInsurance}  
    </div>

<div className="mb-3"><b>Consultas médicas:</b></div>

    { consults.map((consult) => {
return (

<div key={consult.consulta } className="card mb-3">
<div class="card-body">
<blockquote class="blockquote mb-0">
<p className="consults-patients-text">{consult.consulta}</p>
<div className="medicnies">
<SearchMedicines user={props.user}  id={consult.consulta}></SearchMedicines>
</div>
<footer class="blockquote-footer consults-patients-doctor-text"> {consult.doctor}, {consult.date} </footer>
</blockquote>
</div>
</div>

);
})}




    </div>

    </div>

  )

}

export default GetAllPatientsData