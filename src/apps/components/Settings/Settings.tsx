import { useState } from "react";
import Appearance from "./Contents/Appearance";
import Language from "./Contents/Language";
import Game from "./Contents/Game";

export default function Settings() {
    //States
    const [select, setSelect] = useState('Game')


    const handleSelect = (e: any) => {
        const options = document.querySelectorAll('.set-options')
        options.forEach((option: any) => {
            option.classList.remove('active')
        })
        e.target.classList.add('active')
        setSelect(e.target.innerText)
    }

    return (
        <div className="setting-container f-row g-2 pt-4 h-100 mx-auto absolute">
            <aside className="set-aside d-flex g-1 f-justify-end">
                <div className="f-col g-1 h-100 pr-3 w-100">
                    <h3 className="py-2 fs-4 fw-600 mb-1">Settings</h3>
                    <p className="set-options m-0 ml-1 pointer active" onClick={handleSelect}>Game</p>
                    <p className="set-options m-0 ml-1 pointer" onClick={handleSelect}>Appearance</p>
                    <p className="set-options m-0 ml-1 pointer" onClick={handleSelect}>Language</p>
                </div>
            </aside>

            <main className="set-main f-col p-3">
                <h3 className="fw-500 fs-4 mb-3 p-2">{select} Preferences</h3>
                {
                    select === 'Appearance' ? <Appearance /> :
                        select === 'Language' ? <Language /> :
                            select === 'Game' ? <Game /> : null
                }
            </main>
        </div>
    )
}