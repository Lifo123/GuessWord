import { useEffect, useRef } from "react";

interface BoxProps {
    data: any;
    id: number;
}

export default function BoxLetter({ data, id }: BoxProps) {

    const Box = useRef(null)

    useEffect(() => {
        if (data.state) {
            setTimeout(() => {
                Box?.current?.classList.add('v')
                Box?.current?.classList.remove('active')
                setTimeout(() => {
                    Box.current?.setAttribute('eval', data.state)
                }, 260)
            }, id * 260)
        } else {
            Box.current?.setAttribute('eval', '')
        }
    }, [data.state, data.letter, id])


    return (
        <span
            className={`box-letter ${data.letter ? 'active' : ''}`}
            ref={Box}
        >
            {data?.letter?.toUpperCase() || ''}
        </span>
    )
}