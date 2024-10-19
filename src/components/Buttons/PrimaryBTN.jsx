import './Buttons.css'

export default function PrimaryBTN({
    text = "Button",
    funct = () => {
        window.location.href = 'GuessWord/Play'
    } }
) {


    const handleClick = () => {
        funct();
    }

    return (
        <span className='primary-btn d-flex br-4 w-max mx-auto mt-5' onClick={handleClick}>
            {text}
        </span>
    )
}