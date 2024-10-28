import { useStore } from "@nanostores/react"
import context from "@Apps/context/GameStore";
import DarkModeBTN from "@Components/Buttons/DarkModeBTN";

interface AppearanceProps {

}

export default function Appearance() {
    //Stores
    const SETTINGS = useStore(context.setting)



    return (
        <div className="f-col g-2 f-center ">
            <h4 className="br w-100 pb-2">Appearence setings</h4>
            <DarkModeBTN />
            <span className="f-row g-2 f-center">
                {
                    'Lifos'.split('').map((char: any, i: number) => (
                        <span className="box-letter d-flex br-6" key={i}>{char.toUpperCase()}</span>
                    ))
                }
            </span>
            <span className="mt-3">Under construction...</span>
        </div>
    )
}