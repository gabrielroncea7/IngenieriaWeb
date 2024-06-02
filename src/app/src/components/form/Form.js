//Component for creating a form
//Parameters:
// - elements: JSON Vector with FormElement objects
// - button: JSON Button



import React from 'react';
import "./Form.css";
import Button from '../button/Button';
import FormElement from '../formelement/FormElement';


function Form(props) {

//extracts the FormElements and the Button
  const { elements, button, onSubmit } = props;

  // Renders elements and makes them FormElements to show in the finished Form
  const renderElements = () => {
    return elements.map((element, index) => {
      return <FormElement key={index} {...element} />;
    });
  };

  return (
    <form>
      {renderElements()}
      <Button {...button} onClick={(event) => onSubmit(event)}/>
    </form>
  );
}

export default Form;


//ITERATE FORM ELEMENTS THEN BUTTON



//EXAMPLE APP??

//import React from 'react';
//import Form from './Form';

//function App() {
//  const elements = [
//    {
//      type: 'input',
//      label: 'Name:',
//      name: 'name',
//      typeInput: 'text',
//    },
//   {
//      type: 'textarea',
//      label: 'Desc:',
//      name: 'desc',
//    },
//    {
//      type: 'select',
//      label: 'Option:',
//      name: 'op',
//      options: [
//        { value: 'op1', text: 'Op 1' },
//        { value: 'op', text: 'Op 2' },
//        { value: 'op3', text: 'Op 3' },
//      ],
//    },
//  ];

//  const button = {
//    type: 'submit',
//    text: 'Send',
//  };

//  return (
//    <div>
//      <h1>Form</h1>
//      <Form elements={elements} button={button} />
//    </div>
//  );
//}

//export default App;
