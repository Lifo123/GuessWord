import '@Assets/css/Markdown.css'
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
        <div className="setting-container f-markdown f-col f-center g-2 pt-4 h-100 mx-auto absolute">
            <div className='f-row f-wrap w-70 h-100'>
                <aside className="set-aside d-flex g-1 f-justify-end">
                    <div className="f-col g-1 h-100 pr-3 w-100">
                        <h5 className="py-2 fs-4 fw-600 mb-1 mt-3">Settings</h5>
                        <span className="set-options m-0 ml-1 pointer active" onClick={handleSelect}>Game</span>
                        <span className="set-options m-0 ml-1 pointer" onClick={handleSelect}>Appearance</span>
                        <span className="set-options m-0 ml-1 pointer" onClick={handleSelect}>Language</span>
                    </div>
                </aside>

                <main className="set-main f-col pl-3 pt-3 f-grow-1">
                    {
                        select === 'Appearance' ? <Appearance /> :
                            select === 'Language' ? <Language /> :
                                select === 'Game' ? <Game /> : null
                    }
                </main>
            </div>
        </div>
    )
}