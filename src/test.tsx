import { ref, set } from 'firebase/database'
import ES from '../none/ESF.json'
import { DicDB } from './firebase/fireDictionary'
import Esgame from '../none/ESgame.json'




export default function Test() {
    const handleClick = async () => {
       
        
    }

    return (
        <div className='btn btn-blue br-6 mx-auto mt-4' onClick={handleClick}>
            test
        </div>
    )
}