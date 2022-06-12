import React, { useCallback } from "react";
import { withRouter } from "react-router";
import "./SignUpPage.css"
import firebaseconfig from "./firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import translate from "translate";

translate.engine = "google"; 
translate.key = process.env.GOOGLE_KEY;


const SignUp = ({ history }) => {

  const [loader, setLoader] = React.useState(true);


  const setLoaderFunctionTrue = () => {
    document.getElementById('signup').style.opacity="100%";
    setLoader(true)
  }
  const setLoaderFunctionFalse = () => {
    document.getElementById('signup').style.opacity="60%";

    setLoader(false)
  }
  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    setLoaderFunctionFalse()

    const { email, password, profesion, name, password2 } = event.target.elements;
    if (password.value !== password2.value){
      alert('Confirme que su contraseña coincida en ambos campos de texto.')
      setLoaderFunctionTrue()

    }
    else if (profesion.value === ""){
      alert('Seleccione si usted es paciente o pertence al equipo médico.')
      setLoaderFunctionTrue()


    }
    else {
   

    try {
      await firebaseconfig

      
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value); 
       
        const db = firebaseconfig.firestore();
        
        db.collection(profesion.value).add({email: email.value, name: name.value});

        db.collection("info").doc(email.value).set({name: name.value, profesion: profesion.value});


        history.push({ pathname: `/${profesion.value}/inicio`})


      
      
    }  catch (error) {
      setLoaderFunctionTrue(true)

      alert(await translate(error.message, "es"));
    }}
  }, [history]);

 
  return (
    <div>

<div  hidden={loader} className="loader"></div>

    <div id="signup" className="jumbotron vertical-center">
    <div className="container">
      <div className="text-center">


<Link to="/">
      <FontAwesomeIcon className="icon fa-4x" aria-hidden="true" icon={ faNotesMedical}></FontAwesomeIcon>
<h1>Villasana</h1>
</Link>
<div className="registro">Registro</div>


</div>
      <div className="row">
      <div className="col-lg-3 col-md-2"></div>
      <div className="col-lg-6 col-md-8">


      <form onSubmit={handleSignUp}>
      <label>Nombre completo: </label>
      <input className="col-12 input-name" name="name" type="name" required placeholder="Escriba aquí su nombre completo" />
      <label>Correo electrónico: </label>
      <input className="col-12 input-name" name="email" type="email" required placeholder="Escriba aquí su correo electrónico" />
      <label>Contraseña: </label>
      <input  className="col-12 input-name" name="password" type="password"  required placeholder="Escriba aquí su contraseña" />
      <label>Confirmar contraseña: </label>
      <input  className="col-12 input-name" id="password2" name="password2" type="password"  required placeholder="Escriba aquí su contraseña" />
      

     
      <div className="row">
        <div className="col-1 col-md-2"></div>
      <div className="col-5 mt-4">Paciente
      <input className="form-check-input pacient-check"  type="radio" id="profesion" name="profesion" value="pacientes"  name="flexRadioDefault"   />
      
      </div>
      <div className="col-5 mt-4">Equipo médico
      <input className="form-check-input pacient-check"  type="radio" id="profesion" name="profesion" value="equipomedico" name="flexRadioDefault"   />
      
      </div>

      </div>



      <div className="d-flex justify-content-center ">
      <button className=" continue-button btn btn-lg " id="boton" type="submit" >Continuar</button>
      </div>
      
      </form>

      </div>
      <div className="col-lg-3"></div>
      </div>
      </div>

      </div>
      </div>
  );

};




export default withRouter(SignUp);

