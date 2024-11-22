import type { AlertProps } from "@lifo123/library"


export default function Popup({ props }: { props?: AlertProps }) {
    console.log(props);
    

    return (
        <div className="game-popup p-2 br-8 f-col g-2">
            Hola mundo dese un Dialog
        </div>
    )
}