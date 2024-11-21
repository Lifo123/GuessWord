import type { ValidInterface } from "@/Types/Game.Types";
import { _game } from "@/Stores/Game.Store";
import React from "react";
import { useStore } from "@nanostores/react";

export default function Box({
    data, index, currentLetter, currentRow

}: {
    data: ValidInterface, index: number, currentLetter: number | null, currentRow: number
}) {
    const GAME = useStore(_game)
    const Box = React.useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
        if (data.state !== undefined) {
            Box?.current?.removeAttribute('data-valid');
            Box?.current?.removeAttribute('data-win');
            Box.current?.classList.remove('active');
            setTimeout(() => {
                Box?.current?.classList.add('validate');
                setTimeout(() => {
                    Box.current?.setAttribute('data-valid', `${data.state}`);
                    if (GAME.isWin && GAME.currentRow === currentRow) {    
                        setTimeout(() => {
                            Box.current?.setAttribute('data-win', 'true');
                        }, (GAME?.valid[0].length + 1) * 120);
                    }
                }, 200);
            }, index * 210);
        } else {
            Box.current?.classList.remove('active');
            Box.current?.removeAttribute('data-valid');
            Box.current?.removeAttribute('data-win');
        }
    }, [data.state, data.state]);

    return (
        <span className={`game-box d-flex br-4 f-center ${currentLetter === index ? 'target' : ''} ${data.letter ? 'active' : ''} ${GAME.isWin === undefined ? currentRow === GAME.currentRow ? 'pointer' : 'no-select' : ''}`} data-valid={data.state}
            onClick={() => {
                if (GAME.isWin !== undefined) return;
                _game.setKey('currentLetter', index);
            }}
            ref={Box}
        >
            {data.letter}
        </span>
    )
}