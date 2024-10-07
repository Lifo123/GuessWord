import './Row.css'
import Box from '../Box/Box'

export default function Row({ word }) {
    //GlobalStore


    return (
        <div className='f-row g-2 f-center' data-row='inactive'>
            {
                word.split('').map((letter, index) => (
                    <Box key={index} letter={letter} />
                ))
            }
        </div>
    )
}