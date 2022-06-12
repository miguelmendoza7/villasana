import React from "react";


function GetInitialDate(props){
 
      const fecha = new Date(`${props.date}`);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      

      const hour = fecha.getHours();
      const minute = fecha.getMinutes();

      const initialDate = fecha.toLocaleDateString("es-ES", options)
      

    return (
        <div className="consult-text mt-2"><b>Fecha inicial:  </b> {initialDate}, {hour + ":" + minute} </div>
    )
}

export default GetInitialDate