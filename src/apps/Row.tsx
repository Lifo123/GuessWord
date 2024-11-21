import type { ValidInterface } from "@/Types/Game.Types";
import Box from "./Box";


export default function Row({
    data, currentLetter, currentRow, index
}: {
    data: Array<ValidInterface>, currentLetter: number, currentRow: number, index: number
}) {
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