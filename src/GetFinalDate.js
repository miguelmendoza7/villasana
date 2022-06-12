import React from "react";


function GetFinalDate(props){
 
      const fecha = new Date(`${props.date}`);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      

      const hour = fecha.getHours();
      const minute = fecha.getMinutes();

      const finalDate = fecha.toLocaleDateString("es-ES", options)
      


    return (
        <div className="consult-text mt-2"><b>Fecha final:  </b> {finalDate}, {hour + ":" + minute} </div>
    )
}

export default GetFinalDate