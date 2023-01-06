import { ACTIONS } from "./App"


export default function OperationButton({dispatch,operation})
{
    return(
            <button 
            /* button is calling add_digit function, and sending the payload which is the digit */
            onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>
                {operation}
            </button>
    ) 
}