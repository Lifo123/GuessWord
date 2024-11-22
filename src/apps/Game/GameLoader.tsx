import React, { Suspense } from "react";

const Game = React.lazy(() => import("@/apps/Game/Game"));

export default function GameLoader() {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Game />
            </Suspense>
        </>
    );
}
