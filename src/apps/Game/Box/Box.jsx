import useValidation from '@Hooks/useValidation';
import './Box.css';
import { useRef } from 'react';

export default function Box({ letter }) {
    //Hooks
    const { CompareWord } = useValidation();

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
            ValidationWord()
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

    const ValidationWord = () => {
        const GuessWordNodes = document.querySelectorAll(`[data-row='active'] .game-in`);
        let GuessWord = [];
        let allFilled = true;

        GuessWordNodes.forEach((item) => {
            const letter = item.value.toUpperCase();
            GuessWord.push(letter);

            if (letter.length === 0) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            return;
        }

        CompareWord(GuessWord)

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
