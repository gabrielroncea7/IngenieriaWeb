//Component for element of form
//Parameters:
// - Type
// - Name of element
// - Required element (true/false)



import React from 'react';

function FormElement(props) {
//extract type, name and requited aspect of element
  const { Type, Name, Required } = props;

  // requiredValue knows if the element is required (true) or not (false)
  const requiredValue = Required ? "required" : "";

  // switch between types: input, selection or textarea, according to element type
  let element = null;
  switch (Type) {

    case "input":
      element = <input type="text" name={Name} {...requiredValue} />;
      break;

    case "textarea":
      element = <textarea name={Name} {...requiredValue}></textarea>;
      break;

    case "select":
      element = (
        <select name={Name} {...requiredValue}>
          <option value="">Select</option>
          //<option value="opcion1">Opción 1</option>
          //<option value="opcion2">Opción 2</option>
          //<option value="opcion3">Opción 3</option>
        </select>
      );
      break;

    default:
      element = <input type="text" name={Name} {...requiredValue} />;

  }

  return element;
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
//      <FormElement Type="input" Name="name" Required={true} />
//      <FormElement Type="textarea" Name="desc" Required={false} />
//      <FormElement Type="select" Name="op" Required={true} />
//    </div>
//  );
//}
//export default App;
