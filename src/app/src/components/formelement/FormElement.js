//Component for element of form
//Parameters:
// - type
// - name of element
// - required element (true/false)



import React from 'react';
import "./FormElement.css";

function FormElement(props) {
//extract type, name and requited aspect of element
  const { type, name, required } = props;

  // requiredValue knows if the element is required (true) or not (false)
  const requiredValue = required ? "required" : "";

  // switch between types: input, selection or textarea, according to element type
  let element = null;
  switch (type) {

    case "input":
      element = <input type="text" id={name} {...requiredValue} />;
      break;

    case "textarea":
      element = <textarea id={name} {...requiredValue}></textarea>;
      break;

    case "select":
      element = (
        <select id={name} {...requiredValue}>
          <option value="">Select</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      );
      break;

    default:
      element = <input type="text" id={name} {...requiredValue} />;

  }

  return (
          <>
            <div>
              <label from={name}>{name}</label>
            </div>
            <div>
              {element}
            </div>
          </>
        );
}

export default FormElement;


//1. EXTRACT PROPS
//2. LOOK IF REQUIRED ELEMENT
//3. SWITCH BASED ON TYPE

//APP EXAMPLE

//import React from 'react';
//import FormElement from './FormElement';

//function App() {
//  return (
//    <div>
//      <h1>FormElement Component</h1>
//      <FormElement type="input" name="name" required={true} />
//      <FormElement type="textarea" name="desc" required={false} />
//      <FormElement type="select" name="op" required={true} />
//    </div>
//  );
//}
//export default App;
