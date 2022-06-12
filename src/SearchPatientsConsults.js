import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth.js";
import "./FormDoctors.css"
import firebaseconfig from "./firebase-config";
import firebase from "firebase";
import SearchMedicines from "./SearchMedicines.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function FormConsults(props){


    const { currentUser } = useContext(AuthContext);
    const db = firebaseconfig.firestore();
    const [consults, setConsults] = React.useState([]);
    const [consultsInput, setConsultsInput] = React.useState("");
    const [saveButton, setSaveButton] = React.useState(true);
    const [modal, setModal] = React.useState(false);

    const [numberofKeys, setNumberOfKeys] = React.useState(0);

    const [medicineButton, setMedicineButton] = React.useState(true);
    const [allMedicines, setAllMedicines] = React.useState([]);
    const [medicinesInput, setMedicinesInput] = React.useState("");
    const [medicineTimed, setMedicineTimed] = React.useState("");


   const [medicinesList, setMedicinesList] = React.useState([

      "Abacavir",
      "Acetato de medroxiprogesterona",
      "Acetazolamida",
      "Acetilcisteína",
      "Aciclovir",
      "Ácido acetilsalicílico",
      "Ácido ascórbico",
      "Ácido benzoico",
      "Ácido salicílico",
      "Ácido valproico",
      "Adrenalina",
      "Albendazol",
      "Alcuronio",
      "Alopurinol",
      "Alquitrán de hulla",
      "Amidotrizoato",
      "Amikacina",
      "Amilorida",
      "Amitriptilina",
      "Amlodipino",
      "Amodiaquina",
      "Amoxicilina",
      "Ampicilina",
      "Antimoniato de meglumina",
      "Antitoxina diftérica",
      "Artemetero",
      "Artesunato",
      "Asparaginasa",
      "Atenolol",
      "Atropina",
      "Azatioprina",
      "Azitromicina",
      "Beclometasona",
      "Bencilpenicilina",
      "Bencilpenicilina benzatina",
      "Bencilpenicilina procaína",
      "Benznidazol",
      "Benzoato de bencilo",
      "Betametasona",
      "Biperideno",
      "Bleomicina",
      "Bromuro de ipatropio",
      "Bupivacaína",
      "Capreomicina",
      "Carbamazepina",
      "Carbón activado",
      "Carbonato de litio",
      "Cefazolina",
      "Cefixima",
      "Ceftazidima",
      "Ceftriaxona",
      "Ciclofosfamida",
      "Cicloserina",
      "Ciclosporina",
      "Ciprofloxacino",
      "Cisplatino",
      "Citarabina",
      "Citrato de cafeína",
      "Clindamicina",
      "Clofazimina",
      "Clomifeno",
      "Clomipramina",
      "Clorambucilo",
      "Cloranfenicol",
      "Clorfenamina",
      "Clorhexidina",
      "Cloroquina",
      "Cloroxilenol",
      "Clorpromazina",
      "Cloruro de mentilrosanilina",
      "Cloruro de metiltioninio",
      "Cloruro de potasio",
      "Cloruro de sodio",
      "Clotrimazol",
      "Cloxacilina",
      "Codeína",
      "Dapsona",
      "Daunorubucina",
      "Deferoxamina",
      "Dexametasona",
      "Diacetato de aluminio",
      "Diafragmas",
      "Diazepam",
      "Didanosina",
      "Digoxina",
      "Diloxanida",
      "Dimercaprol",
      "Dinitrato de isosorbida",
      "Dinatrol",
      "Doxiciclina",
      "Dopamina",
      "Doxorubicina",
     "Edetato de calcio y sodio",
     "Efavirenzo",
     "Efedrina",
     "Eflornitina",
     "Emtricitabina",
     "Enalapril",
     "Enantato de norestiterona",
     "Epinefrina",
     "Ergocalciferol",
     "Ergometrina",
     "Eritromicina",
     "Espectinomicina",
     "Espironolactona",
     "Estavudina",
     "Estreptomicina",
     "Estreptoquinasa",
     "Etambutol",
     "Etanol",
     "Etinilestradiol",
     "Etionamida",
     "Etopósido",
     "Etosuximida",
     "Fenitoína",
     "Fenobarbital",
     "Fenoximetilpenicilina",
     "Fitomenadiona",
     "Flucitosina",
     "Fluconazol",
     "Flufenazina",
     "Fluoresceína",
     "Fluorouracilo",
     "Fluoruro de sodio",
     "Fluoxetina",
     "Folinato cálcicoe",
     "Furosemida",
     "Gentamicina",
     "Glibenclamida",
     "Gluconato de calcio",
     "Glucosa",
     "Glutaral",
     "Griseofulvina",
     "Haloperidol",
     "Halothano",
     "Heparina sódica",
     "Hidralazina",
     "Hidroclorotiazida",
     "Hidrocortisona",
     "Hidrogenocarbonato de sodio",
     "Hidróxido de aluminio",
     "Hidróxido de magnesio",
     "Hidroxocobalamina",
     "Ibuprofeno",
     "Inmunoglobulina anti-D",
     "Inmunoglobulina antiponzoñosa",
     "Inmunoglobulina antirrábica",
     "Inmunoglobulina antitetánica",
     "Insulina inyectable",
     "Iohexol",
     "Ioduro de potasio",
     "Isoniazida",
     "Ivermectina",
     "Ketamina",
     "Lactato de sodio",
     "Lamivudina",
     "Levamisol",
     "Levonorgestrel",
     "Levotiroxina",
     "Lidocaína",
     "Manitol",
     "Mebendazol",
     "Mefloquina",
     "Melarsoprol",
     "Metformina",
     "Metildopa",
     "Metoclopramida",
     "Metronidazol",
     "Miconazol",
     "Morfina",
     "Naloxona",
     "Nelfinavir",
     "Neostigmina",
     "Nevirapina",
     "Niclosamida",
     "Nicotinamida",
     "Nifurtimox",
     "Nistatina",
     "Nitrito de sodio",
     "Nitrofurantoína",
     "Noretisterona",
     "Óxido nitroso",
     "Oxígeno",
     "Oxitocina",
     "Paracetamol",
     "Paromomicina",
     "Permanganato de potasio",
     "Permetrina",
     "Peróxido de benzoílo",
     "Pilocarpina",
     "Pirantel",
     "Pirazinamida",
     "Piridoxina",
     "Pirimetamina",
     "Povidona yodada",
     "Prazicuantel",
     "Prednisolona",
     "Primaquina",
     "Proguanil",
     "Prometazina",
     "Propiltiouracilo",
     "Propanolol",
     "Quinina",
     "Ranitidina",
     "Resina de podofilo",
     "Retinol",
     "Ribavirin",
     "Riboflavina",
     "Rifampicina",
     "Ritonavir",
     "Sal ferrosa",
     "Salbutamol",
     "Saquinavir",
     "Simvastatina",
     "Sulfato de barrio",
     "Sulfato de cinc",
     "Sulfato de magnesio",
     "Sulfato de protamina",
     "Tenofovir disoproxil fumarato",
     "Tetracaína",
     "Tetraciclina",
     "Tiamina",
     "Timolol",
     "Tiopental",
     "Tiosulfato de sodio",
     "Triclabendazol",
     "Trimetoprim",
     "Trinitrato de glicerilo",
     "Tropicamida",
     "Tuberculina",
     "Verapamilo",
     "Warfarina",
     "Yodo",
     "Zidovudina"







    ]);

    const [suggestionsList, setSuggestionsList] = React.useState({
      suggestions: [],
    });

    const event = new Date();
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    
    const date = event.toLocaleDateString('es-ES', options);

    useEffect(() => {
   

         const searchRequests = async () => {

            const requestsCollection = await  db.collection("info").doc(props.user).collection('consultas').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setConsults(snapshot.docs.map((doc) => (doc.data()))
    
            )});
        
          
        };
        searchRequests();
        
      }, []);

    
      const saveButtonFunction = (event) =>{
        setConsultsInput(event.target.value)
        if (event.target.value.length === 0){
          setSaveButton(true);

        }
        else if (event.target.value.length > 0){
          setSaveButton(false);

        }

      }

      const applySuggestion = (name) =>{
        setSuggestionsList({suggestions:[],})

        setMedicinesInput(name)
        

      }

      const saveMedicine = (event) =>{
        event.preventDefault();

        const values = allMedicines.map(function(o) { return o.medicina; });
        const index = values.indexOf(medicinesInput);
        if (index === -1){
          setAllMedicines((allMedicines) => [
            ...allMedicines,
            {medicina: medicinesInput, 
            duracion: "",
            indicaciones: "",
  
            
            
            },
          ]);
          setMedicinesInput("")
          setMedicineButton(true)
          setNumberOfKeys(numberofKeys + 1)
          setSuggestionsList({suggestions:[],})

        }    
        else {
          alert('El medicamento escrito ya ha sido agregado')
        }

    



      }


      const timeMedicines = (medicina) => {


        setMedicineTimed(medicina)
        setModal(true)
        
      }

      const handleClose = () =>{
        setModal(false)

        //
      }
   

      const changeMedicine = (event) =>{
        
        const medicamento = document.getElementById('medicamento').value;
        let suggestions = [];
        if(medicamento.length === 0){
          setMedicineButton(true)


        }
        else if (medicamento.length > 2){
          setMedicineButton(false)
          const regex = new RegExp(`^${medicamento}`, "i");
          suggestions = medicinesList.sort().filter(v => regex.test(v))
        }
       
        setSuggestionsList({suggestions})
        setMedicinesInput(medicamento)

      }

      const deleteMedicine = (medicine) =>{
        const values = allMedicines.map(function(o) { return o.medicina; });
        const index = values.indexOf(medicine);
        allMedicines.splice(index, 1);
        setNumberOfKeys(Object.keys(allMedicines).length)


      
      }   
     

      const submitData = (event => {
        event.preventDefault();

         if (consultsInput !== ""){
             db.collection("info").doc(props.user).collection('consultas').add({
                 consulta: consultsInput,
                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                 doctor: currentUser.bc.email,
                 date: date,
                 medicinas : allMedicines
                 
                });
                db.collection("info").doc(currentUser.bc.email).collection('consultas').add({
                  consulta: consultsInput,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  paciente: props.user,
                  date: date,
                  medicinas : allMedicines
                  
                 });
             setConsultsInput("")
             setSaveButton(true);
             setAllMedicines([])
             setNumberOfKeys(0);



            }
      })

     function renderSuggestions(){
        if (suggestionsList.length === 0){
          return null
        }
        return(
          <div className="no-margin">
            {suggestionsList.suggestions.map((item) => <div onClick={function(){applySuggestion(item)}} className="card gray-card pt-1 pb-1 pl-1" key={item}>{item}</div>)}
          </div>
        )
      }

      const saveMedicineChanges = (medicina) =>{
        const firstNumber = document.getElementById('first-number').value;
        const firstUnit =  document.getElementById('first-unit').value;
        const secondNumber = document.getElementById('second-number').value;
        const secondUnit =  document.getElementById('second-unit').value;



        const values = allMedicines.map(function(o) { return o.medicina; });
        const index = values.indexOf(medicina);
        if (firstNumber !== "" && secondNumber !== "" && firstUnit !== "" && secondUnit !== ""){
          allMedicines[index].duracion = "(Cada "+firstNumber + " " + firstUnit + " durante " + secondNumber + " " + secondUnit +")";
        }
        if (document.getElementById('treatment-application').value !== ""){
          allMedicines[index].indicaciones = "(" + document.getElementById('treatment-application').value + ")";

        }
        setModal(false)
        const objective = document.getElementById('ready-button');
        objective.scrollIntoView();

      }

   

      return(
<div >



<div >

<Modal  backdrop="static" show={modal}  onHide={handleClose}>
<style>{'body { background-color: gray; }'}</style>
<style>{'.card { background-color: gray; }'}</style>
<style>{'.gray-input { filter: brightness(50%); }'}</style>
<style>{'.gray-button { filter: brightness(50%); }'}</style>

<style>{'. { filter: brightness(50%); }'}</style>

 <ModalHeader><FontAwesomeIcon icon={faTimes} onClick={handleClose}></FontAwesomeIcon></ModalHeader>
               <ModalBody>
                 <div><b>{medicineTimed}</b></div>
                 <div className="pt-2">
                 Consumir cada
                 <select id="first-number"  className="margin-3 select-tag">
    <option disabled selected></option>
    <option >1</option>
    <option >2</option>
    <option >3</option>
    <option >4</option>
    <option >5</option>
    <option >6</option>
    <option >7</option>
    <option >8</option>
    <option >9</option>
    <option >10</option>
    <option >11</option>
    <option >12</option>
    <option >13</option>
    <option >14</option>
    <option >15</option>
    <option >16</option>
    <option >17</option>
    <option >18</option>
    <option >19</option>
    <option >20</option>
    <option >21</option>
    <option >22</option>
    <option >23</option>
    <option >24</option>
    <option >25</option>
    <option >26</option>
    <option >27</option>
    <option >28</option>
    <option >29</option>
    <option >30</option>
    <option >31</option>
    <option >32</option>
    <option >33</option>
    <option >34</option>
    <option >35</option>
    <option >36</option>
    <option >37</option>
    <option >38</option>
    <option >39</option>
    <option >40</option>
    <option >41</option>
    <option >42</option>
    <option >43</option>
    <option >44</option>
    <option >45</option>
    <option >46</option>
    <option >47</option>
    <option >48</option>
    <option >49</option>
    <option >50</option>
    <option >51</option>
    <option >52</option>
    <option >53</option>
    <option >54</option>
    <option >55</option>
    <option >56</option>
    <option >57</option>
    <option >58</option>
    <option >59</option>
    <option >60</option>
    <option >61</option>
    <option >62</option>
    <option >63</option>
    <option >64</option>
    <option >65</option>
    <option >66</option>
    <option >67</option>
    <option >68</option>
    <option >69</option>
    <option >70</option>
    <option >71</option>
    <option >72</option>
    <option >73</option>
    <option >74</option>
    <option >75</option>
    <option >76</option>
    <option >77</option>
    <option >78</option>
    <option >79</option>
    <option >80</option>
    <option >81</option>
    <option >82</option>
    <option >83</option>
    <option >84</option>
    <option >85</option>
    <option >86</option>
    <option >87</option>
    <option >88</option>
    <option >89</option>
    <option >90</option>
    <option >91</option>
    <option >92</option>
    <option >93</option>
    <option >94</option>
    <option >95</option>
    <option >96</option>
    <option >97</option>
    <option >98</option>
    <option >99</option>
    <option >100</option>
  </select>
               <select id="first-unit"   className="select-tag margin-1">
    <option disabled selected></option>
    <option >minutos</option>
    <option >horas</option>
    <option >dias</option>
    <option >semanas</option>
    <option >meses</option>
    <option >años</option>

  </select>

   durante  

  <select  id="second-number"  className="select-tag margin-2">
    <option disabled selected></option>
    <option >1</option>
    <option >2</option>
    <option >3</option>
    <option >4</option>
    <option >5</option>
    <option >6</option>
    <option >7</option>
    <option >8</option>
    <option >9</option>
    <option >10</option>
    <option >11</option>
    <option >12</option>
    <option >13</option>
    <option >14</option>
    <option >15</option>
    <option >16</option>
    <option >17</option>
    <option >18</option>
    <option >19</option>
    <option >20</option>
    <option >21</option>
    <option >22</option>
    <option >23</option>
    <option >24</option>
    <option >25</option>
    <option >26</option>
    <option >27</option>
    <option >28</option>
    <option >29</option>
    <option >30</option>
    <option >31</option>
    <option >32</option>
    <option >33</option>
    <option >34</option>
    <option >35</option>
    <option >36</option>
    <option >37</option>
    <option >38</option>
    <option >39</option>
    <option >40</option>
    <option >41</option>
    <option >42</option>
    <option >43</option>
    <option >44</option>
    <option >45</option>
    <option >46</option>
    <option >47</option>
    <option >48</option>
    <option >49</option>
    <option >50</option>
    <option >51</option>
    <option >52</option>
    <option >53</option>
    <option >54</option>
    <option >55</option>
    <option >56</option>
    <option >57</option>
    <option >58</option>
    <option >59</option>
    <option >60</option>
    <option >61</option>
    <option >62</option>
    <option >63</option>
    <option >64</option>
    <option >65</option>
    <option >66</option>
    <option >67</option>
    <option >68</option>
    <option >69</option>
    <option >70</option>
    <option >71</option>
    <option >72</option>
    <option >73</option>
    <option >74</option>
    <option >75</option>
    <option >76</option>
    <option >77</option>
    <option >78</option>
    <option >79</option>
    <option >80</option>
    <option >81</option>
    <option >82</option>
    <option >83</option>
    <option >84</option>
    <option >85</option>
    <option >86</option>
    <option >87</option>
    <option >88</option>
    <option >89</option>
    <option >90</option>
    <option >91</option>
    <option >92</option>
    <option >93</option>
    <option >94</option>
    <option >95</option>
    <option >96</option>
    <option >97</option>
    <option >98</option>
    <option >99</option>
    <option >100</option>

  </select>


  <select id="second-unit"   className="select-tag">
    <option disabled selected></option>
    <option >minutos</option>
    <option >horas</option>
    <option >dias</option>
    <option >semanas</option>
    <option >meses</option>
    <option >años</option>


  </select>

  </div>

  <textarea id="treatment-application"  type="text" autoComplete="off" className=" col-lg-9 col-md-12  mt-3 form-control " placeholder="Indicaciones sobre la aplicación del medicamento (opcional)"rows="5" ></textarea>




               </ModalBody>
               <ModalFooter>
                 <Button className="modal-button" onClick={function(){saveMedicineChanges(medicineTimed)}}>Aceptar</Button>
               </ModalFooter>
             </Modal>
</div>

<div hidden={props.show} className="row mb-5">

  <div class="col-xl-7 col-lg-7">


<div> <b>Añadir consulta médica</b>
<textarea required onChange={saveButtonFunction} value={consultsInput} type="text" autoComplete="off" className=" col-lg-9 col-md-12 gray-input form-control " placeholder="Indique información sobre la consulta médica" id="consulta" rows="5" name="consulta"></textarea>
<form onSubmit={saveMedicine}>
<div class="input-group  mt-3 search-bar d-flex justify-content-center">

  
<input onChange={function(){changeMedicine()}} value={medicinesInput} type="text" autoComplete="off" class="medicine-input
 form-control gray-input col-xl-9 col-lg-9 col-md-10 col-sm-8 col-8" placeholder="Indique el medicamento recetado" id="medicamento" name="medicamento"></input>
  <div class="input-group-append">
    <button disabled={medicineButton} class="btn btn-primary  gray-button input-group-append save-button " >Añadir</button>
  </div>

</div>
</form>
{renderSuggestions()}

</div>     </div> 



<div className="col-xl-5 col-lg-5">
<div class="card mt-4 mb-5">
  <div id="preview" class="card-header">
    Vista previa
  </div>
  
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <div className="consult-text">{consultsInput}</div>
      { ( numberofKeys !== 0) &&
      <div key={numberofKeys } className="mb-2 mt-2 medicines-text"><b>Medicamentos: </b>

      { allMedicines.map((medicinas) => {
        return (
           
<div  className=" mb-1">
    <div key={medicinas.medicina + medicinas.duracion + medicinas.indicaciones}>{medicinas.medicina}  {medicinas.duracion}   {medicinas.indicaciones}
    <FontAwesomeIcon onClick={ function(){timeMedicines(medicinas.medicina)}} className="clock-medicine" icon={faClock}></FontAwesomeIcon>

    <FontAwesomeIcon   onClick={ function(){deleteMedicine(medicinas.medicina)}} className="errase-medicine" icon={faTrashAlt}></FontAwesomeIcon>

    </div>


</div>
          
        );
      })}
</div>
}
      <footer class="blockquote-footer extra-data mt-1">{currentUser.bc.email + ", " + date}</footer>
      <button disabled={saveButton}  onClick={submitData} class="btn btn-primary save-button gray-button mt-2" >Guardar</button>

    </blockquote>
  </div>
</div>

</div>

</div>







 

              <div className="form-title mb-3">Consultas médicas:</div>


                  { consults.map((consult) => {
        return (
           
<div key={consult.consulta} className="card mb-3">
<div class="card-body">
<blockquote class="blockquote mb-0">
  <div className="consult-text">{consult.consulta}</div>
<SearchMedicines user={props.user}  id={consult.consulta}></SearchMedicines>
  <footer class="blockquote-footer extra-data"> {consult.doctor}, {consult.date} </footer>
</blockquote>
</div>
</div>
          
        );
      })}

</div>
       
          


      )

}



export default FormConsults