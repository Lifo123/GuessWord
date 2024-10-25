import { ref, set } from 'firebase/database'
import ES from '../none/ESF.json'
import { DicDB } from './firebase/fireDictionary'





export default function Test() {

 

    const handleClick = async() => {
        try{
            const validRef = ref(DicDB, 'ES/Validation')
            const validSnap = await set(validRef, ES)
            console.log('Listo');
            
        }catch(e){
            console.log(e)
        }
    }


    return (
        <div className='btn btn-blue br-6 mx-auto mt-4' onClick={handleClick}>
            test
        </div>
    )
}