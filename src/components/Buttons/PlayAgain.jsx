import './Buttons.css'

export default function PlayAgain({funct = () => {
    console.log('Sin funcion');
}}) {

    return (
        <span className='btn btn-green br-6 mt-3 play-btn' onClick={funct} playagain='btn'>
            Jugar de nuevo
        </span>
    )
}