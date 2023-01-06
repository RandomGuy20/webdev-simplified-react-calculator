
import { useReducer } from 'react';
import './styles.css';
import DigitButton from './DigitButton';
import OperationButton  from './OperationButton';

/* Global Calculator Actions*/
export const ACTIONS = 
{
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'CHOOSE-OPERATION',
  CLEAR: 'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}


function reducer(state,{type,payload})
{
  // eslint-disable-next-line default-case
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0") return state; // 
      if(payload.digit === "." && state.currentOperand.includes(".")) 
      {
        return state; // If it includes period and trying to add return current state
      }
      return{
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }
      case ACTIONS.CHOOSE_OPERATION:
        // want to see whatr operation
        //Chekcing to see if string is empty
        if(state.currentOperand == null && state.previousOperand == null)
        {
          return state;
        }
        //Have numbers type but no previous operand
        if(state.previousOperand == null)
        {
          return{
           ...state,
           operation: payload.operation,//matching what we passed in
           previousOperand: state.currentOperand, //Makes current to previous
           currentOperand: null,
          }
        }
        
        //Default Calculator Action
        return{
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand:null
        }

      // eslint-disable-next-line no-fallthrough
      case ACTIONS.CLEAR:
        //send back empoty state
        return {}
  }
}

function evaluate({currentOperand,previousOperand,operation})
{
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if(isNaN(prev) || isNaN(current))
  {
    return "";
  }
  let computation = "";
  // eslint-disable-next-line default-case
  switch(operation)
  {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

function App() {

/* <Reducer></Reducer>*/
const [{currentOperand, previousOperand, operation},dispatch] = useReducer(reducer,{});

  return(

    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>
            {previousOperand} {operation}
        </div>        
        <div className='current-operand'>
        {currentOperand}
        </div>
      </div>

      <button className='span-two' //Calling function to clear
        onClick={() => dispatch({type:ACTIONS.CLEAR})}>
        AC
        </button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className='span-two'>=</button>
    </div>
  )
}

export default App;
