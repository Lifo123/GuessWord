
import './Row.css'


export default function Row({ id, row }) {
    //GlobalStore

    return (
        <div className='game-row f-row g-2 f-center' data-id={id + 1}>
            {
                row?.map((box, index) => (
                    <span
                        className={`box-letter ${box.letter ? 'active' : ''}`}
                        key={index}
                        dltr={box.letter}
                        eval={box.state || ''}
                    >
                        {box.letter.toUpperCase() || ''}
                    </span>
                ))
            }
        </div>
    )
}