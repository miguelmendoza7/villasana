import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle, faHome, faNotesMedical, faSearch, faSignOutAlt, faUserCircle, faUserLock } from "@fortawesome/free-solid-svg-icons";
import firebaseconfig from "./firebase-config";
import { Link } from "react-router-dom";
import "./SideBarDoctors.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const SideBarPatient = (props) => {

    //create initial menuCollapse state using useState hook
    return(
       <div id="body-pd" className="body-pd">
             <div className="l-navbar show" id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav__logo" >
                    <FontAwesomeIcon className=" nav__logo-icon " aria-hidden="true" icon={faNotesMedical}></FontAwesomeIcon><span className="nav__logo-name">Villasana</span>

                    </div>

                    <div className="nav__list ">
                        <Link className={props.one}  to="/pacientes/inicio">
                        <FontAwesomeIcon className=" nav__icon" aria-hidden="true" icon={faHome}></FontAwesomeIcon><span className="nav__name nav__inicio">Inicio</span>
                            </Link>

                            <Link className={props.three}  to="/pacientes/medicamentos">
                        <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faPrescriptionBottle}></FontAwesomeIcon><span className="nav__consultas">Consultas</span>
                            </Link>

                            <Link className={props.four}  to="/pacientes/privacidad">
                    <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faUserLock}></FontAwesomeIcon><span className="nav__privacidad">Privacidad</span>
                            </Link>
                            <Link className={props.five} to="/pacientes/perfil">
                        <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faUserCircle}></FontAwesomeIcon><span className="nav__name">Mi perfil</span>
                            </Link>

                    </div>

                <div  className="nav__link sign-out" onClick={() => firebaseconfig.auth().signOut()}>
                <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={ faSignOutAlt}></FontAwesomeIcon>

                    <span className="nav__name">Cerrar sesión</span>
                </div>

                </div>

            </nav>
            
        </div>
        </div>

    )
};

export default SideBarPatient;