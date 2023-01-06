import { ACTIONS } from "./App"


export default function DigitButton({dispatch,digit})
{
    return(
            <button 
            /* button is calling add_digit function, and sending the payload which is the digit */
            onClick={() => dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
                {digit}
            </button>
    ) 
}