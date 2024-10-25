import BoxLetter from "./Box";

export default function Row({ row = [], id }: { row: any[], id: number }) {


    return (
        <div className='game-row f-row g-2 f-center' data-row={id}>
            {
                row?.map((box: any, i: number) => (
                    <BoxLetter key={i} data={box} id={i} />
                ))
            }
        </div>
    )
}