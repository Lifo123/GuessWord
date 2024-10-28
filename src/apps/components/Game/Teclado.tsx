import BackIcon from "@Assets/icons/BackIcon"
import { control } from "@Apps/utilities/GameControl";
import { useStore } from "@nanostores/react";

export default function Teclado() {



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
        <span className={`keyboard-box pointer d-flex f-center br-4 ${props.className || ''}`} style={props.style} onClick={props.funct}>
            {props.char}
        </span>
    )
}