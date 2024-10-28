import './Wrapper.css'
import { useStore } from "@nanostores/react";
import Game from "./Game/Game"
import Settings from "./Settings/Settings"
import context from "@Apps/context/GameStore";
import Test from 'src/test';

export default function Wrapper() {
    //States
    const NAVIGATION = useStore(context.navigation)

    const handleTheme = () => {

    }

    return (
        <section className="wrapper-continer f-col w-100 o-hidden relative">
            <Game />
            {
                NAVIGATION === 'setting' ? <Settings /> : null
            }
        </section>
    )
}