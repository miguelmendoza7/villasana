import React from "react";
import SideBarDoctors from "./SideBarDoctors";
import "./Spacing.css"
import LogOutDoctors from "./LogOutDoctors";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchPatients.css"
import firebaseconfig from "./firebase-config.js"; 
import GetName from "./GetNamePatients";
import GetImage from "./GetImagePatients";
import VerifyPrivacy from "./VerifyPatientPrivacy";
import FormConsults from "./SearchPatientsConsults";
import { propTypes } from "react-bootstrap/esm/Image";

const SearchPatients = () => {
  LogOutDoctors();

  const [pacientEmail, setPacientEmail] = React.useState("");
  const [dataSended, setDataSended] = React.useState(false);
  const [searchButton, setSearchButton] = React.useState(true);


  const db = firebaseconfig.firestore();

  const searchButtonFunction = () =>{
    setSearchButton(false);
   
  
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

     
    })

    

   

  }

  if (pacientEmail === "" ){
    setPacientEmail("Usuario no encontrado")

  }


    return (
      <>
      <div >
        <SideBarDoctors one={"nav__link"} two={"nav__link active"} three={"nav__link"} four={"nav__link"} five={"nav__link"}></SideBarDoctors>
          <div className="container-spacing">
<div className="container">

<div className=" sticky-top search-bar-div gray-input">
<form className="" onSubmit={checkUser}>
<div class="input-group  search-bar d-flex justify-content-center">
<input onChange={searchButtonFunction}  type="email" id="email" name="email" autoComplete="off" class=" input-search-bar   col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12" placeholder="Buscar paciente con correo electrónico" ></input>
  <div class="input-group-append">
    <button disabled={searchButton}  type="submit" class="btn input-group-append search-button"> <FontAwesomeIcon aria-hidden="true"  icon={faSearch}></FontAwesomeIcon></button>
  </div>

</div>
</form>
</div>


{(dataSended === true && pacientEmail === "Usuario no encontrado")  && 
<div className="not-found">{pacientEmail}</div>
}



{(pacientEmail !== "Usuario no encontrado" && pacientEmail !== "")  && 

<div className="container">

<div className="card col-xl-3  presentation">
<GetImage user={pacientEmail}></GetImage>

<div className="patient-first-data">
<div className="mt-4 patient-name"><GetName user={pacientEmail}></GetName></div>
<div className="mb-4 ml-1 patient-email">{pacientEmail}</div>
</div>

</div>


<VerifyPrivacy user={pacientEmail}></VerifyPrivacy>


</div>

}




</div>


          </div>
        </div>
        
      </>
    );
  };

export default SearchPatients;