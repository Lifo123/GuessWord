
import context from "@Apps/context/GameStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export default function Settings() {
    //States
    const [isActive, setIsActive] = useState(false)
    const [board, setBoard]: any = useState([])

    //Stores
    const SETTINGS = useStore(context.setting)



    useEffect(() => {
        setBoard(Array.from({ length: SETTINGS.tries }, () => Array.from({ length: SETTINGS.length }, () => ({ char: '', isValid: null }))))
    }, [])

    return (
        <div className="setting-container f-row g-2 f-center">
            <aside className="set-aside f-col g-2">
                <h3>Settings</h3>
                <p>Appearance</p>
                <p>Language</p>
            </aside>

            <main className="set-main f-col">

            </main>
            <div className="preview-board f-col g-2 f-center">
                {
                    board?.map((row: any, i: number) => (
                        <span className="f-row g-2 f-center" key={i}>
                            {
                                row?.map((box: any, j: number) => (
                                    <span className="box-letter d-flex br-6" key={j}></span>
                                ))
                            }
                        </span>
                    ))
                }
            </div>
        </div>
    )
}