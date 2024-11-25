import GameIcons from "@/components/GameIcons";
import { GameServices } from "@/services/Game.Services";
import { _game, ManageGame } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import type { ModeTypes } from "@/Types/Settings.Types";
import { ButtonPromise } from "@lifo123/library/components";
import { useStore } from "@nanostores/react";
import React from "react";

export default function Keyboard({ path }: { path: ModeTypes }) {
    const GAME = useStore(_game)
    const [isVisibleRestart, setIsVisibleRestart] = React.useState(false)


    React.useEffect(() => {
        setIsVisibleRestart(false)
        if (GAME.isWin !== undefined) {
            setTimeout(() => {
                setIsVisibleRestart(true)
            }, GAME.valid[0].length * (GAME.isWin ? 350 : 230))

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
            }, (GAME.valid[0].length) * 240)
        }
    }, [GAME.currentRow]);

    return (
        <section className="f-col w-100 relative mt-3">
            <div className="keyboard-container f-col">
                <div className="f-row f-center">
                    {
                        'QWERTYUIOP'.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                </div>
                <div className="f-row f-center">
                    {
                        'ASDFGHJKL'.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                    <span className="key-box-icon d-flex f-center icon w-100 br-4 pointer" onPointerDown={() => ManageGame.backspace()}>
                        <GameIcons id="backspace" />
                    </span>
                </div>
                <div className="f-row f-center">
                    {
                        `ÑZXCVBNM`.split('').map((letter, i) => (
                            <KeyboardBox key={i} content={letter} onPointer={() => ManageGame.typing(letter)} />
                        ))
                    }
                    <span className="key-box-icon d-flex f-center icon w-100 br-4 f-grow pointer" onPointerDown={() => ManageGame.enter(path)}>
                        <GameIcons id="send" />
                    </span>
                </div>
            </div>
            <div className={`play-again absolute d-flex f-center h-100 w-100 ${isVisibleRestart ? 'active' : ''}`}>
                <ButtonPromise className="btn btn-primary br-6" text="Play Again" onClick={async () => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    ManageGame.restart(path)
                }} />
            </div>
        </section>
    )
}

const KeyboardBox = ({
    content, onPointer, className
}: { content: React.ReactNode | string, onPointer: () => void, className?: string }) => {
    return (
        <span className={`key-box br-4 d-flex f-center pointer fw-500 fs-2 ${className || ''}`} onClick={onPointer}
            data-letter={content}
        >
            {content}
        </span>
    )
}