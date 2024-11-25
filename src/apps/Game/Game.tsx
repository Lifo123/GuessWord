'use client'
import React from "react"
import type { ValidInterface } from "@/Types/Game.Types";
import type { ModeTypes } from "@/Types/Settings.Types";
import { _game, ManageGame } from "@/Stores/Game.Store";
import { _setting } from "@/Stores/Settings.Store";
import { useStore } from "@nanostores/react";
import Keyboard from "./Keyboard";
import Popup from "@Apps/Popup";
import Box from "./Box";
import { Alert } from "@lifo123/library";
import { Flifo } from "@lifo123/library/utils";
import { GameServices } from "@/services/Game.Services";
import { _user } from "@/Stores/User.Store";
import { GameUtils } from "@/utils/Game.Utils";
const SETTING = _setting.get();

export default function Game({ path }: { path: ModeTypes }) {
    const USER = useStore(_user)
    const GAME = useStore(_game)
    let validData = GAME.valid

    const onKeydown = async (e: any) => {
        const letterRegex = /^[a-zA-ZñÑ]$/;
        if (GAME.isWin || GAME.isWin === false || GAME.currentRow === GAME.valid.length - 1) return;

        if (letterRegex.test(e.key)) {
            ManageGame.typing(e.key)
        } else if (e.key === 'Backspace') {
            ManageGame.backspace()
        } else if (e.key === 'Enter') {
            const time = await Flifo.timeTracker(() => ManageGame.enter(path))
            console.log(time);
        } else if (e.key === 'ArrowLeft') {
            _game.setKey('currentLetter', _game.get().currentLetter - 1);
        } else if (e.key === 'ArrowRight') {
            _game.setKey('currentLetter', _game.get().currentLetter + 1);
        }
    }


    React.useEffect(() => {
        if (GAME.isWin === undefined && USER.remainingGames > 0) {
            GameServices.preloadData(SETTING.lang, SETTING.length);
            GameUtils.validatePrevData(path, SETTING.lang, SETTING.length)
            const isMobile = Flifo.isMobile();
            if (!isMobile) {
                window.addEventListener('keydown', onKeydown)
                return () => {
                    window.removeEventListener('keydown', onKeydown)
                }
            };
        }
    }, [])


    React.useEffect(() => {
        if (GAME.isWin !== undefined) {
            Alert.custom(<Popup state={GAME.isWin as boolean} />, {
                id: 'game-popup',
                bgClose: true,
                animate: 'custom',
                startAnim: { top: '1rem' },
                endAnim: { top: '-3.5rem' }
            })
        }
    }, [GAME.waiting])

    return (
        <div className="game-board f-col f-align-between mx-auto mt-3"
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
            <Keyboard path={path} />
        </div>
    )
}


const Row = ({
    data, currentLetter, currentRow, index
}: {
    data: Array<ValidInterface>, currentLetter: number, currentRow: number, index: number
}) => {
    return (
        <div className={`f-row f-center`}
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