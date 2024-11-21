import GameIcons from "@/components/GameIcons";
import { GameServices } from "@/services/Game.Services";
import { _game, ManageGame } from "@/Stores/Game.Store";
import { ButtonPromise } from "@lifo123/library";
import { toast } from "@lifo123/library/Toast";
import { useStore } from "@nanostores/react";
import React from "react";

export default function Keyboard() {
    const GAME = useStore(_game)
    const [isVisibleRestart, setIsVisibleRestart] = React.useState(false)


    React.useEffect(() => {
        setIsVisibleRestart(false)
        if (GAME.isWin !== undefined) {
            setTimeout(() => {
                setIsVisibleRestart(true)
            }, GAME.valid[0].length * 250)
        }
    }, [GAME.isWin])


    React.useEffect(() => {
        if (GAME.currentRow > 0 && GAME.currentRow <= GAME.valid.length) {
            setTimeout(() => {
                for (let i = 0; i < GAME.currentRow; i++) {
                    const row = GAME.valid[i];
                    row.forEach((box: any) => {
                        const KEYCHAR = document.querySelector(`[data-letter="${box.letter.toUpperCase()}"]`)
                        if (KEYCHAR?.getAttribute('data-valid') === 'true') return;
                        KEYCHAR?.setAttribute('data-valid', box.state);
                    })
                }
            }, (GAME.valid[0].length) * 260)
        }
    }, [GAME.currentRow]);

    return (
        <section className="f-col w-100 relative mt-3">
            <div className="keyboard-container f-col g-2">
                <div className="f-row g-2">
                    {
                        'QWERTYUIOP'.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                </div>
                <div className="f-row g-2">
                    {
                        'ASDFGHJKL'.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                    <KeyboardBox className="icon" content={<GameIcons id="backspace" />} onPointer={() => ManageGame.backspace()} />
                </div>
                <div className="f-row g-2">
                    {
                        'ZXCVBNM'.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                    <KeyboardBox className="icon" content={<GameIcons id="send" />} onPointer={() => ManageGame.enter()} />
                </div>
            </div>
            <div className={`play-again absolute d-flex f-center h-100 w-100 ${isVisibleRestart ? 'active' : ''}`}>
                <ButtonPromise className="btn btn-primary br-6" text="Play Again" onClick={async () => {
                    GameServices.getWord()
                    ManageGame.restart()
                }} />
            </div>
        </section>
    )
}

const KeyboardBox = ({
    content, onPointer, className
}: { content: React.ReactNode | string, onPointer: () => void, className?: string }) => {
    return (
        <span className={`key-box br-4 d-flex f-center pointer fw-500 fs-custom-14-5 ${className || ''}`} onClick={onPointer}
            data-letter={content}
        >
            {content}
        </span>
    )
}