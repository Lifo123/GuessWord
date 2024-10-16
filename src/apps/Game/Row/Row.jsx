
import { useEffect, useRef } from 'react'
import './Row.css'


export default function Row({ id, row }) {
    //GlobalStore
    

    return (
        <div className='game-row f-row g-2 f-center' data-id={id + 1}>
            {
                row?.map((box, index) => (
                    <BoxLetter key={index} data={box} id={index}/>
                ))
            }
        </div>
    )
}

const BoxLetter = ({data, id}) => {
    const Box = useRef(null)

    useEffect(() => {
        if (data.state) {
            setTimeout(() => {
                Box.current.classList.add('v')
                Box.current.classList.remove('active')
                setTimeout(() => {
                    Box.current.setAttribute('eval', data.state)
                }, 260)
            }, id * 300)
        }
    }, [data.state, data.letter])

    return (
        <span
            className={`box-letter ${data.letter ? 'active' : ''}`}
            dltr={data.letter}
            ref={Box}
        >
            {data.letter.toUpperCase() || ''} 
        </span>
    )
}