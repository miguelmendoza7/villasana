import "./villasana.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import iphoneMock from "./Iphone mock.png"


function showLandingPage () {

 return(
     <div>
<div className="center degray">
<div className="container-fluid ">
        <div className="text-center">

<FontAwesomeIcon className="icono fa-4x mt-3 " aria-hidden="true" icon={ faNotesMedical}></FontAwesomeIcon>
<h1 className="titulo mb-2">Villasana</h1>
</div>
        <div className="row">
            <div className="slogan pb-4">La aplicación web ideal para tus consultas médicas</div>
        </div>
</div>
<div className="container mb-4">
<div className="row mt-2">
    <div className="col-md-6">
<button className="botonindex btn btn-primary col-8 mb-4"  onClick={event =>  window.location.href='/inicio'}>Inicia sesión</button>
</div>

<div className="col-md-6">
<button  className=" botonindex btn btn-primary col-8 mb-3"  onClick={event =>  window.location.href='/registro'}>Registrate</button>
</div>

</div>
</div>
</div>
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <img className="img-fluid iphoneMock" src={iphoneMock} key={iphoneMock}></img>

        </div>
        <div className="col-md-6">
            <h1 className="tool-text ">Una herramienta gratuita, segura y fácil de usar</h1>
        </div>
    </div>
</div>
<h1></h1>
</div>
);
}

export default showLandingPage;