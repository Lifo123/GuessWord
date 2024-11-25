import UpgradeBtn from "@/components/premium/UpgradeBtn";
import { _setting } from "@/Stores/Settings.Store";
import { _user } from "@/Stores/User.Store";
import type { ModeTypes } from "@/Types/Settings.Types";
import { Local } from "@lifo123/library/utils";
import { useStore } from "@nanostores/react";
import React, { Suspense } from "react";

const Game = React.lazy(() => import("@/apps/Game/Game"));

export default function GameLoader({ path }: { path: ModeTypes }) {
    const USER = useStore(_user);

    React.useEffect(() => {
        const SETTING = Local.get(`wordguess-${path}`)?.setting
        const USER = Local.get('wordguess-user')

        if (SETTING) {
            _setting.set(SETTING)
        }

        if (USER) {
            _user.set(USER)
        }
    }, [])

    return (
        <>
            <Suspense fallback={
                <>
                    <div className="skeleton p-2 br-8" style={{ width: '310px', height: '360px' }}></div>
                    <div className="skeleton p-2 br-8" style={{ width: '85%', height: '36px', maxWidth: '400px', animationDelay: '.1s' }}></div>
                    <div className="skeleton p-2 br-8" style={{ width: '90%', height: '36px', maxWidth: '400px', animationDelay: '.2s' }}></div>
                    <div className="skeleton p-2 br-8" style={{ width: '85%', height: '36px', maxWidth: '400px', animationDelay: '.3s' }}></div>
                </>
            }>
                {
                    USER.remainingGames > 0 ? <Game path={path} /> :
                        <div className="f-col g-2 f-justify-center f-align-center mx-auto">
                            <h2 className="fs-7 fw-500">You have reached the limit of free games</h2>
                            <p className="fs-custom-15 m-0">{USER.isLogin ? 'Upgrade to premium to continue playing' : 'Login for more free games'}</p>
                            {
                                USER.isLogin ? <UpgradeBtn /> : (
                                    <a className="btn btn-primary br-6 mt-2" onClick={() => window.location.href = '/acc/login'}>
                                        Sign in
                                    </a>
                                )
                            }
                        </div>
                }
            </Suspense>
        </>
    );
}
