import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./Auth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";


const ForgotPassword = () => {
  const emailRef = useRef()
  const { resetPassword } = AuthContext


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await resetPassword(emailRef.current.value)
      alert("Check your inbox for further instructions")
    } catch {
      alert("Failed to reset password")
    }
  }


  return (
    <div className="jumbotron vertical-center">
    <div className="container">
      <div className="text-center">

      <Link to="/">
      <FontAwesomeIcon className="icon fa-4x" aria-hidden="true" icon={ faNotesMedical}></FontAwesomeIcon>   
<h1>Villasana</h1></Link>
<div className="registro">Restauración de contraseña</div>
</div>
      <div className="row">
      <div className="col-lg-3 col-md-2"></div>

      <div className="col-lg-6 col-md-8">
      <form onSubmit={handleSubmit}>
      <label>Correo electrónico: </label>
      <input className="col-12 input-name" name="email"  ref={emailRef} required type="email" placeholder="Escriba aquí su correo electrónico" />
      
      <div className="d-flex justify-content-center ">
      <button className="continue-button btn btn-lg " id="boton" type="submit">Continuar</button>
      </div>


      </form>
      <div className="text-center mt-4"><Link to="/login"><b className="register-a">Regresar</b></Link></div>

      </div>
      <div className="col-lg-3 col-md-2"></div>
      </div>

      </div>
      </div>
  );
};

export default ForgotPassword;



