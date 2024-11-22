'use client'
import React from "react"
import type { ValidInterface } from "@/Types/Game.Types";
import { _game, ManageGame } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import { useStore } from "@nanostores/react";
import Keyboard from "./Keyboard";
import { Alert } from '@lifo123/library/Stores';
import Popup from "@Apps/Popup";
import Box from "./Box";

export default function Game() {
    const GAME = useStore(_game)
    let validData = GAME.valid

    const onKeydown = (e: any) => {
        const letterRegex = /^[a-zA-Z]$/;
        if (GAME.isWin || GAME.isWin === false || GAME.currentRow === GAME.valid.length - 1) return;

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


    React.useEffect(() => {
        if (GAME.isWin !== undefined) {
            setTimeout(() => {
                if (GAME.isWin === true) {
                    Alert.custom(<Popup />, {
                        state: true,
                        bgClose: true
                    })
                }
                if (GAME.isWin === false) {
                    Alert.custom(<Popup />, {
                        state: true,
                        bgClose: true
                    })
                }
            }, GAME.valid[0].length * 250)
        }
    }, [GAME.isWin])

    return (
        <div className="game-board f-col g-2 f-center w-min mx-auto mt-3"
            style={{ pointerEvents: GAME.isWin !== undefined ? 'none' : 'visible' }}
        >
            {
                validData?.map((row: Array<ValidInterface>, i: number) => (
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


const Row = ({
    data, currentLetter, currentRow, index
}: {
    data: Array<ValidInterface>, currentLetter: number, currentRow: number, index: number
}) => {
    return (
        <div className={`f-row g-2 f-center`}
            data-row={index}
        >
            {
                data?.map((box: ValidInterface, i: number) => (
                    <Box
                        key={i}
                        data={box}
                        index={i}
                        currentLetter={currentRow === index ? currentLetter : null}
                        currentRow={index}
                    />
                ))
            }
        </div>
    )
}