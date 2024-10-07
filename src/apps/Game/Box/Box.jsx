import { useRef } from 'react';
import './Box.css';
import { ValidationWord } from '@Utilities/Validation';

export default function Box() {

    //Refs
    const inputRef = useRef(null);

    // Función para manejar las teclas de navegación
    const onKeyDown = (e) => {
        const next = inputRef.current.nextElementSibling;
        const prev = inputRef.current.previousElementSibling;
        const isAlphabet = /^[a-zA-Z]$/.test(e.key);

        if (e.key === 'Backspace') {
            if (inputRef.current.value) {
                inputRef.current.value = '';
            } else {
                prev?.focus();
            }
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            prev?.focus();
        } else if (e.key === 'ArrowRight') {
            next?.focus();
        } else if (e.key === 'Enter' && inputRef.current.value.length > 0) {
            !ValidationWord() ? console.log('Rellena los campos') : null;
            ;
        }

        if (isAlphabet) {
            inputRef.current.value = e.key.toUpperCase();
            next?.focus();
            e.preventDefault();
        }



    };

    // Función para manejar la entrada del usuario
    const onChange = (e) => {
        const next = inputRef.current.nextElementSibling;
        const isAlphabet = /^[a-zA-Z]$/.test(e.target.value);

        if (isAlphabet) {
            inputRef.current.value = e.target.value.toUpperCase();
            next?.focus();
        } else {
            inputRef.current.value = '';
        }
    };

    const onFocus = (e) => {
        document.querySelectorAll(`[data-row]`).forEach((row) => {
            row.setAttribute('data-row', 'inactive')
        })
        e.target.parentElement.setAttribute('data-row', 'active')
        setTimeout(() => {
            inputRef.current.setSelectionRange(1, 1); // Establece la posición del caret al final
        }, 0);
    }

    return (
        <input
            className='game-in d-flex f-center br-4 p-2 '
            maxLength={1}
            onKeyDown={onKeyDown}
            onInput={onChange}
            onFocus={onFocus}
            ref={inputRef}
        />
    );
}
