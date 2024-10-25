import context from "@Apps/context/GameStore";
import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";

interface BoxProps {
    data: any;
    id: number;
}

export default function BoxLetter({ data, id }: BoxProps) {
    //Stores
    const GAME = useStore(context.game)

    const Box = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (data.isValid !== null) {
            setTimeout(() => {
                Box?.current?.classList.add('validate')
                Box?.current?.classList.remove('active')
                setTimeout(() => {
                    Box.current?.setAttribute('data-valid', data.isValid)
                    if (GAME.isWin) {
                        setTimeout(() => {
                            Box.current?.setAttribute('data-win', 'true');
                        }, (GAME?.valid[0].length + 1) * 130)
                    }
                }, 240)
            }, id * 210)
        } else {
            Box.current?.classList.remove('validate');
            Box.current?.removeAttribute('data-valid')
            Box.current?.removeAttribute('data-win');
        }
    }, [data.isValid, data.char])


    return (
        <span
            className={`box-letter ${data.char ? 'active' : ''}`}
            ref={Box}
        >
            {data?.char?.toUpperCase() || ''}
        </span>
    )
}