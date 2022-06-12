import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileMedical, faHome, faNotesMedical, faSearch, faSignOutAlt, faUserCircle, faUserInjured } from "@fortawesome/free-solid-svg-icons";
import firebaseconfig from "./firebase-config";
import { Link } from "react-router-dom";
import "./SideBarDoctors.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const SideBarDoctors = (props) => {

    //create initial menuCollapse state using useState hook
    return(
       <div id="body-pd" className="body-pd">
             <div className="l-navbar show" id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav__logo" >
                    <FontAwesomeIcon className=" nav__logo-icon " aria-hidden="true" icon={faNotesMedical}></FontAwesomeIcon><span className="nav__logo-name">Villasana</span>

                    </div>

                    <div className="nav__list">
                        <Link className={props.one}  to="/equipomedico/inicio">
                        <FontAwesomeIcon className=" nav__icon" aria-hidden="true" icon={faHome}></FontAwesomeIcon><span className="nav__name nav__inicio">Inicio</span>
                            </Link>

                            <Link className={props.two}  to="/equipomedico/buscarpaciente">
                        <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faSearch}></FontAwesomeIcon><span className="nav__name">Buscar paciente</span>
                            </Link>

                            <Link className={props.three}  to="/equipomedico/misconsultas">
                        <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faFileMedical}></FontAwesomeIcon><span className="nav__consultas">Mis consultas</span>
                            </Link>

                            <Link className={props.four}  to="/equipomedico/mispacientes">
                    <FontAwesomeIcon className=" nav__icon " aria-hidden="true" icon={faUserInjured}></FontAwesomeIcon><span className="nav__pacientes">Mis pacientes</span>
                            </Link>
                            <Link className={props.five} to="/equipomedico/perfil">
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

export default SideBarDoctors;