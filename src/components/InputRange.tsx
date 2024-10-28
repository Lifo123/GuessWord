import { useState } from "react";


export default function InputRange({
    min = 3, max = 10,
    initialValue = 5,
    funct = (value: any) => {
        console.log('Sin funcion', value);
    }
}) {
    //States
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);
        funct(newValue);
    };

    return (
        <input type="range"
            min={min} max={max}
            value={value}
            onInput={handleInputChange}
        />
    )
}