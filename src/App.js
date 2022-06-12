import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import SignUp from './SignUp';
import Login from './LoginPage';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRouting";
import showLandingPage from './villasana';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePacient from './IndexPagePacient';
import HomeDoctors from './IndexPageDoctors';
import ProfileDoctors from './ProfilePageDoctors';
import SearchPatients from './SearchPatientsDoctors';
import ConsultsDoctors from './ConsultsDoctors';
import PatientsDoctors from './PatientsDoctors';
import SearchDoctors from './SearchDoctorsPatients';
import MedicinesPatients from './MedicinesPatients';
import PrivacyPatients from './PrivacyPatients';
import ProfilePatients from './ProfilePatients';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div>
      <PrivateRoute exact path="/pacientes/inicio" component={HomePacient}/>
      <PrivateRoute exact path="/pacientes/medicamentos" component={MedicinesPatients}/>
      <PrivateRoute exact path="/pacientes/privacidad" component={PrivacyPatients}/>
      <PrivateRoute exact path="/pacientes/perfil" component={ProfilePatients}/>




      <PrivateRoute exact path="/equipomedico/inicio" component={HomeDoctors}/>
      <PrivateRoute exact path="/equipomedico/buscarpaciente" component={SearchPatients}/>
      <PrivateRoute exact path="/equipomedico/misconsultas" component={ConsultsDoctors}/>
      <PrivateRoute exact path="/equipomedico/mispacientes" component={PatientsDoctors}/>
      <PrivateRoute exact path="/equipomedico/perfil" component={ProfileDoctors}/>


      <Route exact path="/" component={showLandingPage}/>
      <Route exact path="/registro" component={SignUp}/>
      <Route exact path="/inicio" component={Login}/>
    </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
