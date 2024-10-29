import context from "@Apps/context/GameStore";
import { useStore } from "@nanostores/react";

export default function Stadistic() {
    const STADISTICS = useStore(context.stadistic)
    const SETTINGS = useStore(context.setting)

    return (
        <div className="stadistic-container br-4 f-col pt-2 px-3 pb-3 w-100">
            <div className="f-row g-2 f-center mb-2">
                <p>{STADISTICS?.total}</p>
                <p>{STADISTICS?.win}</p>
                <p>{STADISTICS?.total - STADISTICS?.win}</p>
                <p>{STADISTICS?.streak}</p>
            </div>
            <div className="f-col g-1 w-100">
                {
                    STADISTICS?.rows.slice(0, SETTINGS.tries).map((row: any, i: number) => (
                        <span key={i}>
                            {row}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}