import { _user } from "@/Stores/User.Store"
import { useStore } from "@nanostores/react"


export default function Popup({ state }: { state: boolean }) {
    const USER = useStore(_user)
    
    return (
        <div className="game-popup p-2 br-8 f-col g-2">
            <h2>{state ? 'You win!' : 'You lose'}</h2>
            <p className="fs-custom-13-5 fw-500">
                {state ? 'Congratulations!' : 'Sorry, you lost'}
            </p>
            
        </div>
    )
}