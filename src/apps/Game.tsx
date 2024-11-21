'use client'
import React from "react"
import type { ValidInterface } from "@/Types/Game.Types";
import { _game, ManageGame } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import { useStore } from "@nanostores/react";
import Row from "./Row";
import Keyboard from "./Keyboard";

export default function Game() {
    const GAME = useStore(_game)
    let valid = GAME.valid

    const onKeydown = (e: any) => {
        const letterRegex = /^[a-zA-Z]$/;
        if (letterRegex.test(e.key)) {
            ManageGame.typing(e.key)
        } else if (e.key === 'Backspace') {
            ManageGame.backspace()
        } else if (e.key === 'Enter') {
            ManageGame.enter()
        } else if (e.key === 'ArrowLeft') {
            _game.setKey('currentLetter', _game.get().currentLetter - 1);
        } else if (e.key === 'ArrowRight') {
            _game.setKey('currentLetter', _game.get().currentLetter + 1);
        }
    }


    React.useEffect(() => {
        window.addEventListener('keydown', onKeydown)
        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    }, [])

    return (
        <div className="game-board f-col g-2 f-center w-min mx-auto mt-3">
            {
                valid?.map((row: Array<ValidInterface>, i: number) => (
                    <Row key={i} data={row}
                        currentLetter={GAME.currentLetter}
                        currentRow={GAME.currentRow}
                        index={i}
                    />
                ))
            }
            <Keyboard />
        </div>
    )
}