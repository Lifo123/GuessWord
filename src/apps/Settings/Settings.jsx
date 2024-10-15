 import ToggleBTN from '@Components/Buttons/ToggleBTN'
import './Settings.css'
 
export default function Settings(){
   return (
       <section className='settings f-col g-1'>
           <div className='f-row w-100 f-justify-between g-3'>
                <p>Letters</p>
                <ToggleBTN />
           </div>
           <div className='f-row w-100 f-justify-between g-3'>
                <p>Numbers of tries</p>
                <ToggleBTN />
           </div>
           <div className='f-row w-100 f-justify-between g-3'>
                <p>Letters</p>
                <ToggleBTN />
           </div>
       </section>
   )
}