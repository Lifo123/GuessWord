import BackIcon from "@Assets/icons/BackIcon"
import { control } from "@Apps/utilities/GameControl";
import { useStore } from "@nanostores/react";
import context from "@Apps/context/GameStore";
import { useEffect, useState } from "react";

export default function Teclado() {
    const GAME = useStore(context.game)

    useEffect(() => {
        if (GAME.currentRow > 0 && GAME.currentRow <= GAME.valid.length) {
            setTimeout(() => {
                for (let i = 0; i < GAME.currentRow; i++) {
                    const row = GAME.valid[i];
                    row.forEach((letter: any, j: number) => {
                        const KEYCHAR = document.querySelector(`[data-char="${letter.char.toUpperCase()}"]`)
                        if (KEYCHAR?.getAttribute('data-valid') === 'true') return;
                        KEYCHAR?.setAttribute('data-valid', letter.isValid);

                    })
                }
            }, (GAME.valid[0].length) * 260)
        }
    }, [GAME.currentRow]);



    return (
        <section className="keyboard-container f-col g-2 mt-4">
            <div className="f-row g-2">
                {
                    'QWERTYUIOP'.split('').map((char, i) => (
                        <Boxes key={i} char={char} funct={() => control.typing(char)} />
                    ))
                }
            </div>
            <div className="f-row g-2">
                {
                    'ASDFGHJKL'.split('').map((char, i) => (
                        <Boxes key={i} char={char} funct={() => control.typing(char)} />
                    ))
                }
            </div>
            <div className="f-row g-2">
                <Boxes char="Enviar" className="px-5" funct={() => control.enter()} />
                {
                    'ZXCVBNM'.split('').map((char, i) => (
                        <Boxes key={i} char={char} funct={() => control.typing(char)} />
                    ))
                }
                <Boxes className="px-4" char={<BackIcon />} funct={() => control.backspace()} />
            </div>
        </section>
    )
}

const Boxes = (props: any) => {
    return (
        <span className={`keyboard-box pointer d-flex f-center br-4 ${props.className || ''}`}
            style={props.style}
            onClick={props.funct}
            data-char={props.char}
        >
            {props.char}
        </span>
    )
}