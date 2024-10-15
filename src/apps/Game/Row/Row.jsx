
import './Row.css'


export default function Row({ word, id }) {
    //GlobalStore


    return (
        <div className='game-row f-row g-2 f-center' data-id={id + 1}>
            {
                word?.split('').map((letter, index) => (
                    <span
                        className='box-letter'
                        key={index}
                        did={index}
                        dltr=''
                        eval=''
                    >
                
                    </span>
                ))
            }
        </div>
    )
}