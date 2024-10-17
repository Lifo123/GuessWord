import './Buttons.css'
import { isGameActiveStore, WordLengthStore } from "@Context/GlobalStore"
import { useStore } from "@nanostores/react"
import { useEffect } from "react"


export default function PlayAgain() {
    //GlobalStore
    const isGameActive = useStore(isGameActiveStore)
    const WordLength = useStore(WordLengthStore)

    const handleClick = () => {
        isGameActiveStore.set(true)
    }

    useEffect(() => {
        setTimeout(() => {
            let btnNodes = document.querySelectorAll('[playagain]')
            btnNodes.forEach((node, index) => {
                node.classList.add('active')
            })
        }, (WordLength + 1) * 390);
    }, [])


    return (
        <span className='btn btn-green br-6 mt-3 play-btn' onClick={handleClick} playagain='btn'>
            Jugar de nuevo
        </span>
    )
}