import React, { useCallback, useContext} from "react";
import { withRouter } from "react-router";
import firebaseconfig from "./firebase-config.js"; 
import { AuthContext } from "./Auth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import translate from "translate";

translate.engine = "google"; 
translate.key = process.env.GOOGLE_KEY;




const Login = ({ history }) => {

  const [loader, setLoader] = React.useState(true);


  const setLoaderFunctionTrue = () => {
    document.getElementById('login').style.opacity="100%";
    setLoader(true)
  }
  const setLoaderFunctionFalse = () => {
    document.getElementById('login').style.opacity="60%";

    setLoader(false)
  }
  

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      setLoaderFunctionFalse()
      const { email, password } = event.target.elements;
      try {
        await firebaseconfig
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          const db = firebaseconfig.firestore();
          db.collection('pacientes').get().then(snapshot =>
            {
              const pacientes = []
              snapshot.forEach( doc => {
                const data = doc.data()
                pacientes.push(data)
                pacientes.forEach(paciente => {
                  if (paciente.email === email.value){
                    history.push({ pathname: `/pacientes/inicio`})
                  }             
                 })
              
              })
            })
            db.collection('equipomedico').get().then(snapshot =>
              {
                const equipomedico = []
                snapshot.forEach( doc => {
                  const data = doc.data()
                  equipomedico.push(data)
                  equipomedico.forEach(doctor =>{
                    if (doctor.email === email.value){
                      history.push({ pathname: `/equipomedico/inicio`})
                    }
                  })
                })
              })

           

      } catch (error) {
        setLoaderFunctionTrue(true)
          alert(await translate(error.message, "es"))
      }
    },
    [history]
  );



 


  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    const db = firebaseconfig.firestore();
    db.collection('pacientes').get().then(snapshot =>
      {
        const pacientes = []
        snapshot.forEach( doc => {
          const data = doc.data()
          pacientes.push(data)
          pacientes.forEach(paciente => {
            if (paciente.email === currentUser.bc.email){
              history.push({ pathname: `/pacientes/inicio`})

            }             
           })
        
        })
      })
      db.collection('equipomedico').get().then(snapshot =>
        {
          const equipomedico = []
          snapshot.forEach( doc => {
            const data = doc.data()
            equipomedico.push(data)
            equipomedico.forEach(doctor =>{
              if (doctor.email === currentUser.bc.email){
                history.push({ pathname: `/equipomedico/inicio`})

              }
            })
          })
        })
  }




  return (
    <div>
      <div  hidden={loader} className="loader"></div>
    <div id="login" className=" jumbotron vertical-center">

    <div className="container">
      <div className="text-center">


      <Link to="/">
      <FontAwesomeIcon className="icon fa-4x" aria-hidden="true" icon={ faNotesMedical}></FontAwesomeIcon>   
<h1>Villasana</h1></Link>
<div className="registro">Inicio de sesión</div>

</div>

      <div className="row">
      <div className="col-lg-3 col-md-2"></div>


      <div className="col-lg-6 col-md-8">
      <form onSubmit={handleLogin}>
      <label>Correo electrónico: </label>
      <input className="col-12 input-name" name="email"  required type="email" placeholder="Escriba aquí su correo electrónico" />
      <label>Contraseña: </label>
      <input  className="col-12 input-name" name="password" type="password" required  placeholder="Escriba aquí su contraseña" />

      <div className="d-flex justify-content-center ">
      <button  className="continue-button btn btn-lg " id="boton" type="submit">Continuar</button>
      </div>


      </form>
      <div className="text-center mt-4">¿No tienes cuenta? <Link to="/registro"><b className="register-a">Registrate aquí</b></Link></div>

      </div>
      <div className="col-lg-3 col-md-2"></div>
      </div>

      </div>
      </div>
      </div>
  );
};

export default withRouter(Login);



