
import './Row.css'
import { currentLetterStore } from '@Context/GlobalStore'
import { useEffect, useRef } from 'react'


export default function Row({ row, id }) {
    return (
        <div className='game-row f-row g-2 f-center' row={id}>
            {
                row?.map((box, index) => (
                    <BoxLetter key={index} data={box} id={index} />
                ))
            }
        </div>
    )
}

const BoxLetter = ({ data, id }) => {

    const Box = useRef(null)

    useEffect(() => {
        if (data.state) {
            setTimeout(() => {
                Box.current.classList.add('v')
                Box.current.classList.remove('active')
                setTimeout(() => {
                    Box.current.setAttribute('eval', data.state)
                }, 260)
            }, id * 260)
        }
    }, [data.state, data.letter, id])


    return (
        <span
            className={`box-letter ${data.letter ? 'active' : ''}`}
            ref={Box}
        >
            {data.letter.toUpperCase() || ''}
        </span>
    )
}