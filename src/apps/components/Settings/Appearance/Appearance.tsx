import { useStore } from "@nanostores/react"
import context from "@Apps/context/GameStore";

interface AppearanceProps {

}

export default function Appearance() {
    //Stores
    const SETTINGS = useStore(context.setting)



    return (
        <div className="f-row g-2 f-center ">
            {
                'Lifos'.split('').map((char: any, i: number) => (
                    <span className="box-letter d-flex br-6" key={i}>{char.toUpperCase()}</span>
                ))
            }
           
        </div>
    )
}