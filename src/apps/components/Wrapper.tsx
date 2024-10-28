import './Wrapper.css'
import { useStore } from "@nanostores/react";
import Game from "./Game/Game"
import Settings from "./Settings/Settings"
import context from "@Apps/context/GameStore";

export default function Wrapper() {
    //States
    const NAVIGATION = useStore(context.navigation)

    return (
        <section className="wrapper-continer f-col w-100 f-center">
            <Game />
            {
                NAVIGATION === 'setting' ? <Settings /> : null
            }
        </section>
    )
}