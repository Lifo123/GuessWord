import './Alert.css'
import { AlertStore } from '@Context/GlobalStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

export default function Alert() {
    //GlobalStores
    const Alert = useStore(AlertStore)
    
    useEffect(() => {
        if (Alert) {
            const timer = setTimeout(() => {
                AlertStore.set(null);
            }, Alert[1] * 800);

            return () => clearTimeout(timer);
        }
    }, [Alert]);  

    return (

        Alert ? (
            <span className='alert-box fixed br-6 fs-2 fw-600'>
                {Alert[0]}
            </span>
        ) : null

    )
}