import './Buttons.css'
import { WordLengthStore } from "@Context/GlobalStore"
import { useStore } from "@nanostores/react"
import { useEffect } from "react"


export default function PlayAgain({funct}) {
    const WordLength = useStore(WordLengthStore)

    useEffect(() => {
        setTimeout(() => {
            let btnNodes = document.querySelectorAll('[playagain]')
            btnNodes.forEach((node, index) => {
                node.classList.add('active')
            })
        }, (WordLength + 1) * 390);
    }, [])


    return (
        <span className='btn btn-green br-6 mt-3 play-btn' onClick={funct} playagain='btn'>
            Jugar de nuevo
        </span>
    )
}