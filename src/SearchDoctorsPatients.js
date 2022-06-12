import React from "react";
import SideBarPatient from "./SideBarPatients";
import "./Spacing.css"
import Logout from "./LogOutPatients";
import "./SearchDoctor.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DisplayAllDoctors from "./DisplayAllDoctors";

const SearchDoctors = () => {
  Logout();


  const [profesion, setProfession] = React.useState("");
  const [location, setLocation] = React.useState("");

  const showLocationButton = (event) =>{
    setProfession(event.target.value)

  }

  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl= `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`


    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      setLocation(data.locality + ", " + data.principalSubdivision)

    })
    
  });


    return (
      <>
      <div >
        <SideBarPatient one={"nav__link"} two={"nav__link active"} three={"nav__link"} four={"nav__link"} five={"nav__link"}></SideBarPatient>
          <div className="container-spacing">
            <div className="container">
            

<div >
<div className=" ubication-text"><FontAwesomeIcon className="add-margin" icon={faMapMarkerAlt}></FontAwesomeIcon> {location} </div>

  <select  onChange={showLocationButton}  class="custom-select  select-profession-doctor col-lg-5 col-md-7 col-sm-8 col-12" id="especialidad" name="especialidad">
    <option  disabled="true" selected>Seleccione una especialidad</option>
    <option >Médico General</option>
    <option >Médico Cirujano</option>
    <option>Médico Forense</option>
    <option>Medicina de rehabilitación</option>
    <option>Medicina del deporte</option>
    <option>Alergología</option>
    <option>Anestesiología</option>
    <option>Angiología</option>
    <option>Cardiología</option>
    <option>Endocrinología</option>
    <option>Estomatología</option>
    <option>Gastroenterología</option>
    <option>Genética</option>
    <option>Geriatría</option>
    <option>Hematología</option>
    <option>Hepatología</option>
    <option>Infectología</option>
    <option>Nefrología</option>
    <option>Neumología</option>
    <option>Nutriología</option>
    <option>Neurología</option>
    <option>Oncología</option>
    <option>Pediatría</option>
    <option>Psiquiatría</option>
    <option>Reumatología</option>
    <option>Toxicología</option>
    <option>Dermatología</option>
    <option>Ginecología</option>
    <option>Oftamología</option>
    <option>Otorrinolaringología</option>
    <option>Traumatología</option>
    <option>Urología</option>
    <option>Radiología</option>

  </select>
  
</div>





{(profesion !== "" && location !== "") &&

<div>
  <div className="mt-4">Especialistas en el área de <b>{profesion}</b>, en <b>{location}</b></div>
  <DisplayAllDoctors key={location + " " + profesion} location={location} speciality={profesion}></DisplayAllDoctors>

</div>


}

</div>
          </div>
        </div>
        
      </>
    );
  };

export default SearchDoctors;