//Componente de react que coloca un boton
//Parametros requeridos:
// - debe solicitar el texto interno
// - debe solicitar la accion que se realizara al pulsarse


import React from 'react';

function Button(props) {
//Extrae el valor del texto y la accion de cuando se pulsa (onClick)
  const { text, onClick } = props;

  return (
    <button onClick={onClick}>{text}</button>
  );
}

export default Button;




//1. DESDE LA APP DEBE HABER UNA FUNCION TIPO "HANDLE" QUE SE EJECUTE CON EL CLICK DEL BOTON
//2. PONEMOS EL BOTON CON EL TEXTO QUE SEA Y LA FUNCION EVENTO QUE SE EJECUTARA CUANDO SE HAGA CLICK EN EL BOTON -> AL BOTON LE PASARA EL TEXTO Y LA ACCION DE CUANDO SE PULSE
//EN LA APLICACION MAIN SERIA ALGO COMO:
//import React from 'react';
//import Button from './Button';
//function App() {
//  const handleClick = () => {
//    console.log('¡El botón ha sido clicado!');
//  };

//  return (
//    <div>
//      <h1>Componente de Botón</h1>
//      <Button texto="Haz clic aquí" onClick={handleClick} />
//    </div>
//  );
//}
//export default App;
