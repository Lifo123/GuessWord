 import { WordStore } from '@Context/GlobalStore';
import './Buttons.css';
 
export default function PrimaryBTN({text = 'Enter text', }){

    //Functons
    const onClick = () => {
        location.href = '/GuessWord/Guess';
    }

   return (
       <span className="d-flex btn btn-green br-4 p-2 f-center mt-4 mx-auto w-min" onClick={onClick}>
           {text}
       </span>
   )
}