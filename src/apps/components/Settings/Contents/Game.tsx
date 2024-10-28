import context from "@Apps/context/GameStore";
import { useStore } from "@nanostores/react";
import setting from "@Apps/utilities/GameSettings";
import InputRange from '@Components/InputRange';

export default function Game() {
    //States


    //Stores
    const SETTINGS = useStore(context.setting)
    const GAME = useStore(context.game)

    return (
        <div className="game-set f-col">
            <h4 className="br pb-2">Game settings</h4>
            <p className=''>Choose and setup the properties of the game.</p>
            <section className='f-row g-4 w-100 mt-4'>
                <div className='f-col g-3 mt-1' style={{ minWidth: 280 }}>
                    <span className='f-row f-justify-between'>
                        <label className='fw-600'>Word Length</label>
                        <InputRange min={3} max={10} initialValue={SETTINGS.length} funct={setting.setWordLength} />
                    </span>
                    <span className='f-row f-justify-between'>
                        <label className='fw-600'>Number of Tries</label>
                        <InputRange min={3} max={10} initialValue={SETTINGS.tries} funct={setting.setTries} />
                    </span>
                </div>
                <span className='f-col g-2' style={{ flexGrow: 1 }}>
                    {
                        GAME?.valid.map((char: any, i: number) => (
                            <span className="f-row g-2 br-6 f-justify-center" key={i}>
                                {
                                    GAME?.valid[i].map((letter: any, j: number) => (
                                        <span className="box-letter d-flex br-6" key={j} style={{height: 40}}></span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </span>
            </section>
        </div>
    )
}