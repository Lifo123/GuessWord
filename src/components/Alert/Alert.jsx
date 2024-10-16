import './Alert.css'
import { AlertStore } from '@Context/GlobalStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

export default function Alert() {
    //GlobalStores
    const Msg = useStore(AlertStore)
    
    useEffect(() => {
        if (Msg) {
            const timer = setTimeout(() => {
                AlertStore.set(null);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [Msg]);  

    return (

        Msg ? (
            <span className='alert-box fixed br-6 fs-2 fw-600'>
                {Msg}
            </span>
        ) : null

    )
}